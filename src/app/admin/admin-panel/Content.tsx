"use client";

import { deleteGameService } from "@/lib/services/admin";
import { completeBorrowService } from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, HistoryItem } from "@/types";
import { useState } from "react";
import AddGame from "../add-game/page";
import GameInfo from "./GameInfo";
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
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
  console.log(games);

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
                onClick={() => handleGameChange(game)}
              >
                {game.gameName}
              </h2>
              <div
                className={`${getCellColor(game.borrowStatus)} w-3/4 text-center`}
              >
                {capitalize(game.borrowStatus)}
              </div>
              <div>{game.apartment}</div>
              <div>{formatDate(game.borrowDate) || "-"}</div>
              <div>{formatDate(game.dueDate) || "-"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      {gameDetails && (
        <GameInfo
          gameDetails={gameDetails}
          updateBorrow={updateBorrow}
          confirmDeletion={confirmDeletion}
          setConfirmDeletion={setConfirmDeletion}
          handleGameDeletion={handleGameDeletion}
          currentHistory={currentHistory}
        />
      )}

      {!gameDetails && <AddGame setGames={setGames} />}
    </div>
  );
};

export default Content;
