"use client";
import { useDisplayMessage } from "@/components/useDisplayMessage";
import { completeBorrowService } from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { useState } from "react";

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
  // const [errorMessage, setErrorMessage] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const [displayMessage, errorMessage] = useDisplayMessage();

  const handleClick = async () => {
    setDisabled(true);

    try {
      await completeBorrowService(borrow.borrowId);
      setHidden(true);
    } catch (error) {
      if (error instanceof Error) {
        displayMessage(error.message);
        setDisabled(false);
      }
    }
  };

  return (
    <>
      <div
        // min-[677px] is the size where button text no longer goes on 2 lines
        className="sm:flex-rows flex flex-col text-lg min-[677px]:text-xl"
        style={{ display: hidden ? "none" : "" }}
      >
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold leading-6 sm:pr-3 sm:font-normal">
            {borrow.name}
          </span>

          <span className="leading-6">
            <span className="sm:hidden">Due:</span> {formatDate(borrow.dueDate)}
          </span>

          <button
            onClick={handleClick}
            disabled={disabled}
            className="btn-primary mt-1 w-full max-w-52"
          >
            Return Game
          </button>
        </div>
      </div>

      <span className="text-red-800">{errorMessage}</span>
    </>
  );
};

export default BorrowRow;
