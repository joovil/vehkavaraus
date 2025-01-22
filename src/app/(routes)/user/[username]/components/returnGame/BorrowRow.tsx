"use client";
import completeBorrowService from "@/lib/services/borrows/returnBorrowService";
import { formatDate } from "@/lib/utils/formatDate";
import { showError } from "@/lib/utils/showError";
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = async () => {
    setDisabled(true);

    const res = await completeBorrowService(borrow.borrowId);

    if (res.status === 200) {
      console.log("returned \n", await res.json());
      setHidden(true);
      return;
    }
    const data = await res.json();

    console.log(data);
    if (data.error) {
      showError(setErrorMessage, data.error, () => setDisabled(false));
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
      <span className="text-red-500">{errorMessage}</span>
    </>
  );
};

export default BorrowRow;
