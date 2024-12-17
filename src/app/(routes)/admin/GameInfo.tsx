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
    {} as GameWithCurrentBorrow,
  );
  const [isVisible, setVisible] = useState<boolean>(false);
  const [gameList, setGameList] = useState<GameWithCurrentBorrow[]>(games);

  const updateGame = (updatedGame: GameWithCurrentBorrow) => {
    setGameList((prevGames) =>
      prevGames.map((game) =>
        game.gameId === updatedGame.gameId ? updatedGame : game,
      ),
    );
    setCurrentGame(updatedGame);
  };

  return (
    <div className="m-auto flex w-1/2 flex-col gap-y-6">
      <div className="box-basic grid grid-cols-5 gap-y-3 text-xl">
        {colNames.map((col) => (
          <span key={col} className="font-black">
            {col}
          </span>
        ))}
        {gameList.map((g) => (
          <GameRow
            key={g.name}
            game={g}
            visible={isVisible}
            setVisible={setVisible}
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
          />
        ))}
      </div>

      <MoreInfo
        isVisible={isVisible}
        game={currentGame}
        updateGame={updateGame}
      />
    </div>
  );
};

export default GameInfo;
