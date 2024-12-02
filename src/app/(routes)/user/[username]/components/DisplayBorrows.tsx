"use client";

import returnBorrowService from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatuses } from "@/types/game";
import { useState } from "react";

export interface borrowProps {
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
    <div key={borrow.borrowId} className="grid gap-y-3">
      <BorrowRow
        key={borrow.name}
        borrow={borrow}
        setClientBorrows={setClientBorrows}
      />
    </div>
  ));
};

const BorrowRow = ({
  borrow,
  setClientBorrows,
}: {
  borrow: borrowProps;
  setClientBorrows: React.Dispatch<React.SetStateAction<borrowProps[]>>;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleReturn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await returnBorrowService(borrow.borrowId, borrow.gameId);
    const data = await res.json();

    if (res.status === 200) {
      const { returnedGameId } = data;
      setClientBorrows((borrows) =>
        borrows.filter((b) => b.borrowId !== returnedGameId)
      );
    } else {
      setErrorMessage(data.error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 text-xl">
        <span className="flex items-center">{borrow.name}</span>
        <span className="flex items-center">
          {formatDate(borrow.return_date)}
        </span>
        <button className="btn-primary" onClick={handleReturn}>
          Return button
        </button>
      </div>
      <span className="text-red-500">{errorMessage}</span>
    </>
  );
};

export default DisplayBorrows;
