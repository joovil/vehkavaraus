"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, BorrowStatusesType } from "@/types";
import Image from "next/image";
import { useState } from "react";

const cols = ["Name", "Status", "User", "Borrow date", "Due date"];

const Content = ({ games }: { games: AdminGame[] }) => {
  const [game, setGame] = useState<AdminGame | null>();

  const handleGameSet = (newGame: AdminGame) => {
    if (game === newGame) {
      setGame(null);
      return;
    }

    setGame(newGame);
  };

  return (
    <>
      <div className="box-basic mb-8 flex flex-col gap-2 text-xl">
        <div className="grid grid-cols-5 font-bold">
          {cols.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        {games.map((game) => (
          <div key={game.gameId} className="grid grid-cols-5">
            <button
              onClick={() => handleGameSet(game)}
              className="text-long-name text-left"
            >
              {game.gameName}
            </button>

            <div
              className={`${getCellColor(game.borrowStatus)} w-3/4 text-center`}
            >
              {capitalize(game.borrowStatus)}
            </div>
            <div>{game.username || "-"}</div>
            <div>{formatDate(game.borrowDate) || "-"}</div>
            <div>{formatDate(game.dueDate) || "-"}</div>
          </div>
        ))}
      </div>

      {game && (
        <div className="box-basic flex gap-4">
          <div className="relative aspect-[1/1] w-1/3">
            <Image
              src={game.imageUrl || "/fallbackGame.png"}
              alt={game.gameName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col text-xl">
            <span className="font-bold">{game.gameName}</span>
            <span>Status: {capitalize(game.borrowStatus)}</span>

            {game.borrowStatus !== "free" && (
              <div className="flex flex-col">
                <span>Borrower: {game.username}</span>
                <span>Apartment: {game.apartment}</span>
                <span>Borrow date: {formatDate(game.borrowDate)}</span>
                <span>Due date: {formatDate(game.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getCellColor = (status: BorrowStatusesType) => {
  switch (status) {
    case "free":
      return "bg-darkGreenV text-offWhiteV";
    case "borrowed":
      return "bg-orangeV";
    default:
      return "bg-pinkV";
  }
};

export default Content;
