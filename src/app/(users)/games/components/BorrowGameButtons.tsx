"use client";

import { createBorrowService } from "@/lib/services/borrows/createBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { Game } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";

const BorrowGameButtons = ({ game: g }: { game: Game }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [game, setGame] = useState<Game>(g);
  const { data: session } = useSession();

  const handleBorrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setDisabled(true);

    try {
      const res = await createBorrowService(game.id);
      setDisabled(false);

      setGame((g) => ({
        ...g,
        borrowStatus: "borrowed",
        availableDate: res.dueDate,
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  // Show buttons when game is free to borrow
  const ConfirmButtons = () => {
    return (
      <>
        <button
          className="btn-primary"
          onClick={handleBorrow}
          disabled={disabled}
        >
          Confirm
        </button>

        <button
          className="btn-primary"
          onClick={() => setVisible((v) => !v)}
        >
          Cancel
        </button>
      </>
    );
  };

  if (game.borrowStatus === "free") {
    return (
      <div className="flex gap-3">
        <button
          className="btn-primary"
          onClick={() => setVisible((v) => !v)}
          style={{ display: visible ? "block" : "none" }}
        >
          Borrow
        </button>

        {session?.user.role !== "user" && session?.user.role !== "admin"
          ? // Show message to non verified users
            !visible && (
              <>
                <span className="content-center text-lg">Verify account</span>
                <button
                  className="btn-primary"
                  onClick={() => setVisible((v) => !v)}
                >
                  Cancel
                </button>
              </>
            )
          : // Show confirm buttons to verified users
            !visible && <ConfirmButtons />}
      </div>
    );
  }

  // Show available date when game is not free to borrow
  return (
    <div className="my-2 flex flex-col text-2xl font-bold">
      <div className="font-normal">
        <span>Available: </span>
        <span>{formatDate(game.availableDate)}</span>
      </div>
    </div>
  );
};

export default BorrowGameButtons;
