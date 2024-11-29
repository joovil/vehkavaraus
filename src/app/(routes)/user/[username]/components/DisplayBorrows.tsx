"use client";

import returnBorrowService from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatuses } from "@/types/game";
import { useState } from "react";

interface borrowProps {
  borrow_date: Date;
  return_date: Date;
  borrow_status: BorrowStatuses;
  name: string;
  borrowId: number;
  gameId: number;
}

const DisplayBorrows = ({ borrows }: { borrows: borrowProps[] }) => {
  const [clientBorrows, setClientBorrows] = useState<borrowProps[]>(borrows);

  return clientBorrows.map((borrow) => (
    <BorrowRow
      key={borrow.name}
      borrow={borrow}
      setClientBorrows={setClientBorrows}
    />
  ));
};

const BorrowRow = ({
  borrow,
  setClientBorrows,
}: {
  borrow: borrowProps;
  setClientBorrows: React.Dispatch<React.SetStateAction<borrowProps[]>>;
}) => {
  // TODO: Add error notification
  const handleReturn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await returnBorrowService(borrow.borrowId, borrow.gameId);

    if (res.status === 200) {
      const { returnedGameId } = await res.json();
      setClientBorrows((borrows) =>
        borrows.filter((b) => b.borrowId !== returnedGameId)
      );
    }
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

export default DisplayBorrows;
