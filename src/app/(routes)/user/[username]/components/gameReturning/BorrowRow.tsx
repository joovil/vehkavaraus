"use client";
import { formatDate } from "@/lib/utils/formatDate";
import { useState } from "react";
import ReturnButton from "./ReturnButton";

export interface BorrowProp {
  gameId: number;
  borrowDate: Date;
  dueDate: Date;
  borrowStatus: "free" | "borrowed" | "late";
  name: string;
  borrowId: number;
}

const BorrowRow = ({ borrow }: { borrow: BorrowProp }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      <div
        className="grid grid-cols-3 gap-y-3 text-xl"
        style={{ display: hidden ? "none" : "" }}
      >
        <span className="flex items-center">{borrow.name}</span>
        <span className="flex items-center">
          {formatDate(borrow.borrowDate)}
        </span>
        <ReturnButton
          borrow={borrow}
          setHidden={setHidden}
          setError={setErrorMessage}
        >
          Return game
        </ReturnButton>
      </div>
      <span className="text-red-500">{errorMessage}</span>
    </>
  );
};

export default BorrowRow;
