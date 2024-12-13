"use client";

import ImageBasic from "@/components/ImageBasic";
import { getBorrowByGameIdService } from "@/lib/services/borrows/getBorrowByGameIdService";
import { formatDate } from "@/lib/utils/formatDate";
import { Fragment, useEffect } from "react";
import BorrowStatusButtons from "./BorrowStatusButtons";
import { HistoryItem } from "./GameInfo";
import { GameWithCurrentBorrow } from "./page";

const cols = ["Borrower", "Date borrowed", "Date returned"];

const MoreInfo = ({
  isVisible,
  game,
  borrowHistory,
  setBorrowHistory,
}: {
  isVisible: boolean;
  game: GameWithCurrentBorrow;
  borrowHistory: { [key: number]: HistoryItem[] };
  setBorrowHistory: React.Dispatch<
    React.SetStateAction<{ [key: number]: HistoryItem[] }>
  >;
}) => {
  useEffect(() => {
    const getHistory = async () => {
      if (!borrowHistory[game.gameId]) {
        const history = await getBorrowByGameIdService(game.gameId);
        setBorrowHistory((prev) => ({ ...prev, [game.gameId]: history }));
      }
    };

    if (isVisible) {
      getHistory();
    }
  }, [game.gameId, isVisible, borrowHistory, setBorrowHistory]);

  const history = borrowHistory[game.gameId] || [];

  return (
    <div className="box-basic" hidden={!isVisible}>
      <div>
        <h2>More Info</h2>
        <h3>{game.name}</h3>

        <ImageBasic src={game.imageUrl} />

        <div className="flex gap-3 text-xl items-center">
          <span>Mark as: </span>
          <BorrowStatusButtons game={game} />
        </div>
      </div>

      <div>
        <h3>History</h3>
        <ul className="grid grid-cols-3">
          {cols.map((c) => (
            <li key={c}>{c}</li>
          ))}
          {history.map((b) => (
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
