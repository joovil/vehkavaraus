"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import { BorrowerInfo, Titles } from "./BorrowerInfo";

const DesktopPanel = ({
  games,
  gameDetails,
  history,
  handleGameSet,
  getCellColor,
  capitalize,
}: {
  games: AdminGame[];
  gameDetails: AdminGame | null;
  history: HistoryItem[];
  handleGameSet: (newGame: AdminGame) => void;
  getCellColor: (
    status: BorrowStatusesType,
  ) => "bg-darkGreenV text-offWhiteV" | "bg-orangeV" | "bg-pinkV";
  capitalize: (word: string) => string;
}) => {
  return (
    <>
      <div className="box-basic mb-8 flex flex-col gap-2 text-xl">
        <Titles />

        {games.map((game) => (
          <div
            key={game.gameId}
            className="grid grid-cols-5"
          >
            <button
              onClick={() => handleGameSet(game)}
              className="text-long-name text-left"
            >
              {game.gameName}
            </button>

            <div
              className={`${getCellColor(game.borrowStatus)} w-3/4 text-center`}
            >
              {capitalize(game.borrowStatus)}
            </div>
            <div>{game.username || "-"}</div>
            <div>{formatDate(game.borrowDate) || "-"}</div>
            <div>{formatDate(game.dueDate) || "-"}</div>
          </div>
        ))}
      </div>

      {gameDetails && (
        <BorrowerInfo
          gameDetails={gameDetails}
          capitalize={capitalize}
          history={history}
        />
      )}
    </>
  );
};

export default DesktopPanel;
