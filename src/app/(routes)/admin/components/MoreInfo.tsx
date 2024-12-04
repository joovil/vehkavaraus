"use client";

import ImageBasic from "@/components/ImageBasic";
import { getBorrowByGameIdAction } from "@/lib/actions/borrows/getBorrowByGameIdAction";
import { formatDate } from "@/lib/utils/formatDate";
import React, { useEffect } from "react";
import { GameProp, HistoryItem } from "../DisplayAdminPanel";
import BorrowStatusButtons from "./BorrowStatusButtons";

const cols = ["Borrower", "Date borrowed", "Date returned"];

const MoreInfo = ({
  isVisible,
  game,
  borrowHistory,
  setBorrowHistory,
}: {
  isVisible: boolean;
  game: GameProp;
  borrowHistory: { [key: number]: HistoryItem[] };
  setBorrowHistory: React.Dispatch<
    React.SetStateAction<{ [key: number]: HistoryItem[] }>
  >;
}) => {
  useEffect(() => {
    const getHistory = async () => {
      if (!borrowHistory[game.id]) {
        const history = await getBorrowByGameIdAction(game.id);
        setBorrowHistory((prev) => ({ ...prev, [game.id]: history }));
      }
    };
    if (isVisible) {
      getHistory();
    }
  }, [game.id, isVisible, borrowHistory, setBorrowHistory]);

  const history = borrowHistory[game.id] || [];

  return (
    <>
      <div className="box-basic" hidden={!isVisible}>
        <h2>More Info</h2>
        <h3>{game.name}</h3>

        <ImageBasic src={game.image} />

        <div className="flex gap-3 text-xl items-center">
          <span>Mark as: </span>
          <BorrowStatusButtons game={game} />
        </div>

        <div>
          <h3>History</h3>
          <ul className="grid grid-cols-3">
            {cols.map((c) => (
              <li key={c}>{c}</li>
            ))}
            {history.map((b) => (
              // TODO: Add loading indicator
              <React.Fragment key={b.borrowId}>
                <li key={`${b.borrowId}-username`}>{b.username}</li>
                <li key={`${b.borrowId}-borrow_date`}>
                  {formatDate(b.borrow_date)}
                </li>
                <li key={`${b.borrowId}-return_date`}>
                  {formatDate(b.return_date)}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
