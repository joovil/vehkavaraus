"use client";

import { fetchAllAdminGames } from "@/lib/services/admin/getAllAdminGames";
import { getBorrowByGameIdService } from "@/lib/services/borrows/getBorrowByGameIdService";
import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import { useEffect, useState } from "react";
import AddGame from "./addGame";
import DesktopPanel from "./desktopPanel/DesktopPanel";
import MobilePanel from "./mobilePanel/MobilePanel";

// NOTE: Yes, this component is a mess and no it won't be refactored at this point
const Content = ({ preloadedGames }: { preloadedGames: AdminGame[] }) => {
  const [gameDetails, setGameDetails] = useState<AdminGame | null>(null);
  const [games, setGames] = useState<AdminGame[]>(preloadedGames);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const updateGames = async () => {
      setGames(await fetchAllAdminGames());
    };
    updateGames();
  }, []);

  useEffect(() => {
    const getHistory = async () => {
      try {
        if (gameDetails) {
          const gameHistory = await getBorrowByGameIdService(
            gameDetails?.gameId,
          );
          setHistory(gameHistory);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    getHistory();
  }, [gameDetails, gameDetails?.gameId]);

  const handleGameSet = (newGame: AdminGame) => {
    if (gameDetails === newGame) {
      setGameDetails(null);
      return;
    }

    setGameDetails(newGame);
  };

  return (
    <div>
      <div className="min-[925px]:hidden">
        <MobilePanel
          games={games}
          gameDetails={gameDetails}
          history={history}
          setGameDetails={setGameDetails}
          handleGameSet={handleGameSet}
          capitalize={capitalize}
          getCellColor={getCellColor}
        />
      </div>

      <div className="hidden min-[925px]:block">
        <DesktopPanel
          games={games}
          gameDetails={gameDetails}
          history={history}
          handleGameSet={handleGameSet}
          capitalize={capitalize}
          getCellColor={getCellColor}
        />
      </div>

      {!gameDetails && <AddGame setGames={setGames} />}
    </div>
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
