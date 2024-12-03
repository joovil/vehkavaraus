"use client";

import { getBorrowByGameIdAction } from "@/lib/actions/borrows/getBorrowByGameIdAction";
import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatuses } from "@/types/game";
import { useEffect } from "react";
import { HistoryItem } from "../DisplayAdminPanel";
import { GameProp } from "../page";

const borrowStatusList = Object.keys(BorrowStatuses.Enum);
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
        <div className="flex gap-3 text-xl items-center">
          Mark as:{" "}
          {borrowStatusList
            .filter((status) => status !== game.borrow_status)
            .map((s) => (
              // TODO: Add functionality to buttons
              <button className="btn-primary" key={s}>
                {s}
              </button>
            ))}
        </div>

        <div>
          <h3>History</h3>
          <ul className="grid grid-cols-3">
            {cols.map((c) => (
              <li key={c}>{c}</li>
            ))}
            {history.map((b) => (
              // TODO: Add loading indicator
              <>
                <li key={`${b.borrowId}-username`}>{b.username}</li>
                <li key={`${b.borrowId}-borrow_date`}>
                  {formatDate(b.borrow_date)}
                </li>
                <li key={`${b.borrowId}-return_date`}>
                  {formatDate(b.return_date)}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
