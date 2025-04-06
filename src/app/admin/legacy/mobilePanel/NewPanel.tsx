"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import Image from "next/image";

const NewPanel = ({
  games,
  handleGameDeletion,
  gameDetails,
  history,
  handleGameSet,
  getCellColor,
  capitalize,
}: {
  games: AdminGame[];
  handleGameDeletion: (id: number) => Promise<void>;
  gameDetails: AdminGame | null;
  history: HistoryItem[];
  handleGameSet: (newGame: AdminGame) => void;
  getCellColor: (
    status: BorrowStatusesType,
  ) => "bg-darkGreenV text-offWhiteV" | "bg-orangeV" | "bg-pinkV";
  capitalize: (word: string) => string;
}) => {
  const handleClick = (id: AdminGame) => {
    handleGameSet(id);
    console.log(history);
  };

  return (
    <div>
      {games.map((game) => (
        <div
          key={game.gameId}
          className="box-basic"
        >
          <h2 onClick={() => handleClick(game)}>{game.gameName}</h2>
          <div className="relative mb-2 aspect-[1/1] sm:w-1/2">
            <Image
              src={game.imageUrl || "/fallbackGame.png"}
              alt={game.gameName}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <div className="flex gap-3">
            <button className="btn-primary">Show history</button>
            <button className="btn-primary">Delete Game</button>
          </div>
          <div>asd</div>
          {history
            .filter((h) => h.gameId === game.gameId)
            .map((history) => (
              <div key={history.id}>
                <div>{formatDate(history.borrowDate)}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default NewPanel;
