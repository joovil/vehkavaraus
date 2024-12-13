"use client";

import { useState } from "react";
import GameRow from "./GameRow";
import MoreInfo from "./MoreInfo";
import { GameWithCurrentBorrow } from "./page";

const colNames = ["Name", "Status", "Apartment", "Borrowed", "Due"];

export interface HistoryItem {
  username: string;
  id: number;
  borrowDate: Date;
  returnDate: Date | null;
}

const GameInfo = ({ games }: { games: GameWithCurrentBorrow[] }) => {
  const [currentGame, setCurrentGame] = useState<GameWithCurrentBorrow>(
    {} as GameWithCurrentBorrow
  );
  const [borrowHistory, setBorrowHistory] = useState<{
    [key: number]: HistoryItem[];
  }>({});
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <div className="m-auto w-1/2 flex flex-col gap-y-6">
      <div className="box-basic grid grid-cols-5 text-xl gap-y-3">
        {colNames.map((col) => (
          <span key={col} className="font-black">
            {col}
          </span>
        ))}
        {games.map((g) => (
          <GameRow
            key={g.name}
            game={g}
            setVisible={setVisible}
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
          />
        ))}
      </div>

      <MoreInfo
        isVisible={isVisible}
        game={currentGame}
        borrowHistory={borrowHistory}
        setBorrowHistory={setBorrowHistory}
      />
    </div>
  );
};

export default GameInfo;
