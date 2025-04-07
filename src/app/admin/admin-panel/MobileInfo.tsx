"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, HistoryItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { capitalize } from "./utils";

const MobileInfo = ({
  game,
  currentHistory,
  handleGameDeletion,
}: {
  game: AdminGame;
  currentHistory: HistoryItem[];
  handleGameDeletion: () => Promise<void>;
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3 lg:hidden [&_button]:sm:w-3/4">
      <div className="relative mb-2 mt-2 aspect-[1/1] sm:w-1/2">
        <Image
          src={game.imageUrl || "/fallbackGame.png"}
          alt={game.gameName}
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>

      {game.borrowStatus === "borrowed" && (
        <div className="text-xl [&_h3]:inline-block">
          <div>
            <h3>Borrower:</h3> {capitalize(game.apartment!)}
          </div>
          <div>
            <h3>Borrowed:</h3> {formatDate(game.borrowDate)}
          </div>
          <div>
            <h3>Due:</h3> {formatDate(game.dueDate)}
          </div>
        </div>
      )}

      {!confirmDeletion && (
        <button
          className="btn-primary text-md w-full"
          onClick={() => setShowHistory((b) => !b)}
        >
          {!showHistory ? "History" : "Hide"}
        </button>
      )}

      {!showHistory && (
        <>
          {!confirmDeletion ? (
            <button
              className="btn-primary bg-redWarning w-full"
              onClick={() => setConfirmDeletion(true)}
            >
              Delete
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                className="btn-primary w-full"
                onClick={() => setConfirmDeletion(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary bg-redWarning w-full"
                onClick={handleGameDeletion}
              >
                Confirm
              </button>
            </div>
          )}
        </>
      )}

      {showHistory && (
        <div>
          <div className="grid grid-cols-3">
            {["Apartment", "Borrowed", "Due"].map((col) => (
              <div
                key={col}
                className="text-long-name"
              >
                {col}
              </div>
            ))}
          </div>

          {currentHistory.map((history) => (
            <div
              key={history.id}
              className="grid grid-cols-3"
            >
              <div>{history.apartment}</div>
              <div>{formatDate(history.borrowDate)}</div>
              <div>{formatDate(history.dueDate)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileInfo;
