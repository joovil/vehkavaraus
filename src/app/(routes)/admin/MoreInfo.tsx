"use client";

import ImageBasic from "@/components/ImageBasic";
import { getBorrowByGameIdService } from "@/lib/services/borrows/getBorrowByGameIdService";
import { formatDate } from "@/lib/utils/formatDate";
import { Fragment, useEffect, useState } from "react";
import BorrowStatusButtons from "./BorrowStatusButtons";
import { HistoryItem } from "./GameInfo";
import { GameWithCurrentBorrow } from "./page";

const cols = ["Borrower", "Date borrowed", "Date returned"];

const MoreInfo = ({
  isVisible,
  game,
  updateGame,
}: {
  isVisible: boolean;
  game: GameWithCurrentBorrow;
  updateGame: (game: GameWithCurrentBorrow) => void;
}) => {
  const [history, setHistory] = useState<HistoryItem[]>();

  useEffect(() => {
    const getHistory = async () => {
      setHistory(await getBorrowByGameIdService(game.gameId));
    };

    if (isVisible) getHistory();
  }, [game.gameId, isVisible]);

  return (
    <div className="box-basic flex flex-col gap-y-3" hidden={!isVisible}>
      <div>
        <h2>More Info</h2>
        <h3>{game.name}</h3>
      </div>

      <ImageBasic src={game.imageUrl} />

      <div className="flex items-center gap-3 text-xl">
        <BorrowStatusButtons game={game} updateGame={updateGame} />
      </div>

      <div>
        <h3>History</h3>
        <ul className="grid grid-cols-3">
          {cols.map((c) => (
            <li key={c}>{c}</li>
          ))}
          {history &&
            history.map((b) => (
              <Fragment key={b.id}>
                <li>{b.username}</li>
                <li>{formatDate(b.borrowDate)}</li>
                <li>{formatDate(b.returnDate)}</li>
              </Fragment>
              // TODO: Add loading indicator
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MoreInfo;
