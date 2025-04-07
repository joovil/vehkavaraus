"use client";

import { deleteGameService } from "@/lib/services/admin";
import { completeBorrowService } from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, Game, HistoryItem } from "@/types";
import { useState } from "react";
import AddGame from "../add-game/page";
import GameInfo from "./GameInfo";
import MobileInfo from "./MobileInfo";
import { capitalize, getCellColor } from "./utils";

const cols = ["Name", "Status", "Apartment", "Borrow date", "Due date"];

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
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);

  const handleGameChange = async (game: AdminGame) => {
    setConfirmDeletion(false);
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

  const updateBorrow = async (borrowId: number): Promise<Game> => {
    try {
      const res = await completeBorrowService(borrowId);
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
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleGameDeletion = async () => {
    try {
      if (gameDetails?.gameId) {
        await deleteGameService(gameDetails.gameId);
        setGames((prev) => prev.filter((g) => g.gameId !== gameDetails.gameId));
        setGameDetails(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="box-basic">
        {/* Col headers */}
        <div className="mb-2 hidden lg:grid lg:grid-cols-5">
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
              className="text-xl lg:grid lg:grid-cols-5"
            >
              <h2
                className="text-long-name"
                onClick={() => handleGameChange(game)}
              >
                {game.gameName}
              </h2>
              <div
                className={`${getCellColor(game.borrowStatus)} font flex items-center justify-center lg:w-3/4`}
              >
                {capitalize(game.borrowStatus)}
              </div>
              {/* Info for desktop */}
              <div className="hidden lg:block">{game.apartment || "-"}</div>
              <div className="hidden lg:block">
                {formatDate(game.borrowDate) || "-"}
              </div>
              <div className="hidden lg:block">
                {formatDate(game.dueDate) || "-"}
              </div>

              {/* Info for mobile */}
              {gameDetails && gameDetails.gameId === game.gameId && (
                <MobileInfo
                  game={gameDetails}
                  currentHistory={currentHistory}
                  handleGameDeletion={handleGameDeletion}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="hidden lg:block">
        {gameDetails && (
          <GameInfo
            gameDetails={gameDetails}
            setGameDetails={setGameDetails}
            updateBorrow={updateBorrow}
            confirmDeletion={confirmDeletion}
            setConfirmDeletion={setConfirmDeletion}
            handleGameDeletion={handleGameDeletion}
            currentHistory={currentHistory}
          />
        )}
      </div>

      {!gameDetails && <AddGame setGames={setGames} />}
    </div>
  );
};

export default Content;
