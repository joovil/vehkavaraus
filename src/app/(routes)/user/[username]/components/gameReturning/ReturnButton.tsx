"use client";

import returnBorrowService from "@/lib/services/borrows/returnBorrowService";
import { showError } from "@/lib/utils/showError";
import { useState } from "react";
import { BorrowProp } from "./BorrowRow";

const ClientButton = ({
  children,
  borrow,
  setHidden,
  setError,
}: {
  children: React.ReactNode;
  borrow: BorrowProp;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = async () => {
    console.log("hello");
    setDisabled(true);

    const res = await returnBorrowService(borrow.borrowId);

    if (res.status === 200) {
      console.log("returned \n", await res.json());
      setHidden(true);
      return;
    }
    const data = await res.json();

    console.log(data);
    if (data.error) {
      showError(setError, data.error, () => setDisabled(false));
    }
  };

  return (
    <>
      <button
        className="btn-primary disabled:bg-greenDisabledV"
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
};

export default ClientButton;
