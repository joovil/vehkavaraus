"use client";

import { formatDate } from "@/lib/utils/formatDate";

interface props {
  borrow_date: Date;
  return_date: Date;
  borrow_status: "free" | "borrowed" | "late";
  name: string;
}

const BorrowRow = ({ borrow }: { borrow: props }) => {
  const handleReturn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
