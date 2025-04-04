"use client";

import { deleteGameService } from "@/lib/services/games/deleteGameService";
import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, HistoryItem } from "@/types";
import Image from "next/image";
import { useState } from "react";

const cols = ["Name", "Status", "User", "Borrow date", "Due date"];

export const Titles = () => {
  return (
    <div className="grid grid-cols-5">
      {cols.map((c) => (
        <h2
          className="text-xl font-bold"
          key={c}
        >
          {c}
        </h2>
      ))}
    </div>
  );
};

export const BorrowerInfo = ({
  gameDetails,
  capitalize,
  history,
}: {
  gameDetails: AdminGame;
  capitalize: (word: string) => string;
  history: HistoryItem[];
}) => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const deleteGame = async () => {
    const res = await deleteGameService(gameDetails.gameId);
    console.log(res);
  };

  return (
    <div className="box-basic mb-8 flex h-[300px] gap-4">
      <div className="relative aspect-[1/1] w-fit">
        <Image
          src={gameDetails.imageUrl || "/fallbackGame.png"}
          alt={gameDetails.gameName}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid w-full grid-cols-2">
        <div className="flex flex-col bg-amber-300">
          <h2 className="font-bold">{gameDetails.gameName}</h2>
          <div>
            <h3 className="inline text-xl">Status:</h3>{" "}
            {capitalize(gameDetails.borrowStatus)}
          </div>
          {gameDetails.borrowStatus !== "free" && (
            <div className="flex flex-1 flex-col [&>div>h3]:inline [&>div>h3]:text-xl">
              <div>
                <h3>Borrower:</h3> {gameDetails.username}
              </div>
              <div>
                <h3>Apartment:</h3> {gameDetails.apartment}
              </div>
              <div>
                <h3>Borrow date:</h3> {formatDate(gameDetails.borrowDate)}
              </div>
              <div>
                <h3>Due date:</h3> {formatDate(gameDetails.dueDate)}
              </div>
            </div>
          )}

          {/* Delete button */}
          <div className="[&>button]:btn-primary [&>button]:bg-redV [&>button]:disabled:bg-redDisabledV mt-auto flex gap-3">
            {!confirm ? (
              <button onClick={() => setConfirm(true)}>Delete</button>
            ) : (
              <>
                <button onClick={deleteGame}>Confirm</button>
                <button onClick={() => setConfirm(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-y-scroll">
          <h2>History</h2>
          <div className="grid grid-cols-2 [&>h3]:text-xl">
            <h3>Borrower</h3>
            <h3>Returned</h3>
          </div>

          {history.map((h) => (
            <div
              key={h.id}
              className="grid grid-cols-2"
            >
              <div>{h.username}</div>
              <div>{formatDate(h.returnDate) || "In borrow"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
