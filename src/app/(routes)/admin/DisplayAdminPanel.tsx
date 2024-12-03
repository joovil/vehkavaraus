"use client";

import { getGamesWithCurrentBorrow } from "@/lib/actions/games/getGamesWithCurrentBorrow";
import { useEffect, useState } from "react";
import GameRow from "./components/GameRow";
import MoreInfo from "./components/MoreInfo";
import { GameProp } from "./page";

const colNames = ["Name", "Status", "Apartment", "Borrowed", "Return"];

export interface HistoryItem {
  borrowId: number;
  borrow_date: Date;
  return_date: Date;
  username: string;
}

const DisplayAdminPanel = ({ initialGames }: { initialGames: GameProp[] }) => {
  const [games, setGames] = useState<GameProp[]>(initialGames);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [infoContent, setInfoContent] = useState<GameProp>({} as GameProp);
  const [borrowHistory, setBorrowHistory] = useState<{
    [key: number]: HistoryItem[];
  }>({});

  useEffect(() => {
    const getGames = async () => {
      setGames(await getGamesWithCurrentBorrow());
    };
    getGames();
  }, []);

  return (
    <>
      <div className="box-basic grid grid-cols-5 text-xl gap-y-3">
        {colNames.map((col) => (
          <span key={col} className="font-black">
            {col}
          </span>
        ))}
        {games.map((g) => {
          return (
            <GameRow
              key={g.id}
              game={g}
              setShowInfo={setVisible}
              infoContent={infoContent}
              setInfoContent={setInfoContent}
            />
          );
        })}
      </div>
      <MoreInfo
        isVisible={isVisible}
        game={infoContent}
        borrowHistory={borrowHistory}
        setBorrowHistory={setBorrowHistory}
      />
    </>
  );
};

export default DisplayAdminPanel;
