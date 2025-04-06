"use client";

import { completeBorrowService } from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, HistoryItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { capitalize, getCellColor } from "./utils";

const cols = ["Name", "Status", "User", "Borrow date", "Due date"];

const Content = ({
  games: preloadedGames,
  getBorrowHistory,
}: {
  games: AdminGame[];
  getBorrowHistory: (id: number) => Promise<HistoryItem[]>;
}) => {
  const [games, setGames] = useState<AdminGame[]>(preloadedGames);
  const [gameDetails, setGameDetails] = useState<AdminGame | null>(null);
  const [currentHistory, setCurrentHistory] = useState<HistoryItem[]>([]);
  console.log(games);

  const handleClick = async (game: AdminGame) => {
    if (gameDetails === game) {
      setGameDetails(null);
      return;
    }
    setGameDetails(game);
    try {
      setCurrentHistory(await getBorrowHistory(game.gameId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateBorrow = async (borrowId: number) => {
    try {
      const res = await completeBorrowService(borrowId);
      console.log(res);
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.borrowId === borrowId
            ? {
                ...game,
                borrowStatus: "free",
                apartment: null,
                borrowDate: null,
                dueDate: null,
              }
            : game,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="box-basic">
        {/* Col headers */}
        <div className="grid grid-cols-5">
          {cols.map((c) => (
            <h2
              className="text-2xl font-bold"
              key={c}
            >
              {c}
            </h2>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {games.map((game) => (
            <div
              key={game.gameId}
              className="grid grid-cols-5 text-xl"
            >
              <h2
                className="text-long-name"
                onClick={() => handleClick(game)}
              >
                {game.gameName}
              </h2>
              <div
                className={`${getCellColor(game.borrowStatus)} w-3/4 text-center`}
              >
                {capitalize(game.borrowStatus)}
              </div>
              <div>{game.apartment || "-"}</div>
              <div>{formatDate(game.borrowDate) || "-"}</div>
              <div>{formatDate(game.dueDate) || "-"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      {gameDetails && (
        <div className="box-basic">
          <h2>Alias</h2>
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
                        <h3>Borrower:</h3> {gameDetails.apartment}
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
                <button
                  className="btn-primary"
                  onClick={() =>
                    gameDetails.borrowId && updateBorrow(gameDetails.borrowId)
                  }
                >
                  Mark as returned
                </button>
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
                        <div>
                          {formatDate(history.returnDate) || "In borrow"}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
