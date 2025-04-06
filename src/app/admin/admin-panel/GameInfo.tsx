"use client";
import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, HistoryItem } from "@/types";
import Image from "next/image";
import { capitalize } from "./utils";

const GameInfo = ({
  gameDetails,
  updateBorrow,
  confirmDeletion,
  setConfirmDeletion,
  handleGameDeletion,
  currentHistory,
}: {
  gameDetails: AdminGame;
  updateBorrow: (borrowId: number) => Promise<void>;
  confirmDeletion: boolean;
  setConfirmDeletion: React.Dispatch<React.SetStateAction<boolean>>;
  handleGameDeletion: () => Promise<void>;
  currentHistory: HistoryItem[];
}) => {
  return (
    <div className="box-basic">
      <h2>{gameDetails.gameName}</h2>
      <div className="flex gap-3">
        <div className="relative aspect-[1/1] h-[300px] w-[300px]">
          <Image
            src={gameDetails.imageUrl || "/fallbackGame.png"}
            alt={gameDetails.gameName}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

        <div className="grid w-full grid-cols-2">
          {/* Game details */}
          <div className="flex flex-col justify-between">
            <div className="text-xl [&_h3]:inline-block">
              <div>
                <h3>Status:</h3> {gameDetails.borrowStatus}
              </div>
              {gameDetails.borrowStatus !== "free" && (
                <div>
                  <div>
                    <h3>Borrower:</h3> {capitalize(gameDetails.apartment || "")}
                  </div>
                  <div>
                    <h3>Borrowed:</h3> {formatDate(gameDetails.borrowDate)}
                  </div>
                  <div>
                    <h3>Due date:</h3> {formatDate(gameDetails.dueDate)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {!confirmDeletion && (
                <button
                  className="btn-primary"
                  onClick={() =>
                    gameDetails.borrowId && updateBorrow(gameDetails.borrowId)
                  }
                >
                  Mark as returned
                </button>
              )}
              {!confirmDeletion ? (
                <button
                  className="btn-primary bg-redWarning"
                  onClick={() => setConfirmDeletion(true)}
                >
                  Delete game
                </button>
              ) : (
                <div className="w-1/2">
                  <button
                    className="btn-primary mb-2 w-full"
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
            </div>
          </div>

          <div className="max-h-[300px] w-full overflow-y-scroll">
            {currentHistory && (
              <>
                <h3>History</h3>
                <div className="grid grid-cols-3">
                  {["User", "Due", "Returned"].map((col) => (
                    <div
                      key={col}
                      className="font-bold"
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
                    <div>{history.username}</div>
                    <div>{formatDate(history.dueDate)}</div>
                    <div>{formatDate(history.returnDate) || "-"}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
