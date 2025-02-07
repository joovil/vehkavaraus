"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import { useState } from "react";

export const BorrowerInfo = ({ game }: { game: AdminGame }) => {
  return (
    <div className="sm:[&>div>h3]:text-md mb-2 text-lg [&>div>h3]:inline [&>div>h3]:text-lg">
      <div>
        <h3>Borrower: </h3>
        {game.username}
      </div>
      <div>
        <h3>Borrow date: </h3>
        {formatDate(game.borrowDate)}
      </div>
      <div>
        <h3>Due date: </h3>
        {formatDate(game.dueDate)}
      </div>
    </div>
  );
};

export const BorrowHistory = ({ history }: { history: HistoryItem[] }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <>
      <button
        className="btn-primary w-36 sm:w-full"
        onClick={() => setShowDetails((b) => !b)}
      >
        {showDetails ? "Hide history" : "Show history"}
      </button>

      {showDetails && (
        <>
          <div className="grid grid-cols-2 [&>h3]:inline [&>h3]:text-lg">
            <h3>User</h3>
            <h3>Return date</h3>
          </div>

          <div className="max-h-48 overflow-y-scroll">
            {history.map((h) => (
              <div key={h.id} className="grid grid-cols-2">
                <div>{h.username}</div>
                <div>{formatDate(h.returnDate) || "In borrow"}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export const CloseButton = ({
  setGameDetails,
}: {
  setGameDetails: React.Dispatch<React.SetStateAction<AdminGame | null>>;
}) => {
  return (
    <button
      className="ml-2 text-right text-xl font-bold sm:hidden"
      onClick={() => setGameDetails(null)}
    >
      X
    </button>
  );
};

export const BorrowStatus = ({
  game,
  getCellColor,
  capitalize,
}: {
  game: AdminGame;
  getCellColor: (
    status: BorrowStatusesType,
  ) => "bg-darkGreenV text-offWhiteV" | "bg-orangeV" | "bg-pinkV";
  capitalize: (word: string) => string;
}) => {
  return (
    <div
      className={`${getCellColor(game.borrowStatus)} flex h-full w-full items-center justify-center text-center text-xl font-bold`}
    >
      {capitalize(game.borrowStatus)}
    </div>
  );
};
