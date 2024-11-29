"use client";

import returnBorrowService from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";

interface props {
  borrow_date: Date;
  return_date: Date;
  borrow_status: "free" | "borrowed" | "late";
  name: string;
  borrowId: number;
  gameId: number;
}

const BorrowRow = ({ borrow }: { borrow: props }) => {
  // TODO: Add error notification
  const handleReturn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(borrow);

    const res = await returnBorrowService(borrow.borrowId, borrow.gameId);
    console.log(res);
    if (res.status === 200) {
    }

    console.log(await res.json());
  };

  return (
    <>
      <span className="flex items-center">{borrow.name}</span>
      <span className="flex items-center">
        {formatDate(borrow.return_date)}
      </span>
      <button className="btn-primary" onClick={handleReturn}>
        Return button
      </button>
    </>
  );
};

export default BorrowRow;
