"use client";

import { createBorrowService } from "@/lib/services/borrows/createBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { NewBorrowSchema } from "@/types/borrow";
import { Game } from "@/types/game";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const GameCard = ({
  game,
  updateGames,
}: {
  game: Game;
  updateGames: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[300px] relative">
        <Image
          src={game.image || "test.png"}
          alt="Picture of a board game"
          fill
          className="object-cover"
        />
      </div>
      <span className="font-bold text-2xl my-2">{game.name}</span>

      {game.borrow_status === "free" ? (
        <Buttons game={game} updateGames={updateGames} />
      ) : (
        <div className="font-bold text-2xl my-2 flex flex-col">
          <div className="font-normal">
            <span>Available: </span>
            <span>{formatDate(game.available_date)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Buttons = ({
  game,
  updateGames,
}: {
  game: Game;
  updateGames: (id: number) => void;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const session = useSession();

  const handleBorrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(session);

    // TODO: handle non logged user
    if (session.status === "unauthenticated") {
      return;
    }

    console.log(session);
    const borrowToCreate = NewBorrowSchema.parse({
      borrower: session.data?.user.id,
      game: game.id,
    });

    const res = await createBorrowService(borrowToCreate);
    updateGames(game.id);
  };
  return (
    <>
      {visible ? (
        <div className="flex gap-3">
          <button className="btn-primary" onClick={handleBorrow}>
            Confirm
          </button>
          <button className="btn-primary" onClick={(v) => setVisible(!v)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button className="btn-primary" onClick={() => setVisible(!visible)}>
            Borrow
          </button>
        </>
      )}
    </>
  );
};

export default GameCard;
