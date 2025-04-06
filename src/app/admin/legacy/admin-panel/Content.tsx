"use client";

import { deleteGameService } from "@/lib/services/admin";
import { fetchAllAdminGames } from "@/lib/services/admin/getAllAdminGames";
import { getBorroHistory } from "@/lib/services/borrows/getBorrowByGameIdService";
import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import { useEffect, useState } from "react";
import AddGame from "./addGame";
import DesktopPanel from "./desktopPanel/DesktopPanel";
import NewPanel from "./mobilePanel/NewPanel";

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
          const gameHistory = await getBorroHistory(gameDetails?.gameId);
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

  const handleGameDeletion = async (id: number) => {
    try {
      await deleteGameService(id);
      setGames((prev) => prev.filter((g) => g.gameId !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="min-[925px]:hidden">
        <NewPanel
          games={games}
          handleGameDeletion={handleGameDeletion}
          gameDetails={gameDetails}
          history={history}
          handleGameSet={handleGameSet}
          capitalize={capitalize}
          getCellColor={getCellColor}
        />
      </div>

      <div className="hidden min-[925px]:block">
        <DesktopPanel
          games={games}
          handleGameDeletion={handleGameDeletion}
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
