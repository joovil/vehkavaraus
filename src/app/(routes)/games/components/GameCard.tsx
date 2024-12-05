"use client";

import { createBorrowService } from "@/lib/services/borrows/createBorrowService";
import { Game } from "@/types";
import { useState } from "react";

const GameCard = ({ game }: { game: Game }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleBorrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);

    const res = await createBorrowService(game.id);

    if (res.error) {
      console.error(res.error);
      setDisabled(false);
      return;
    }
  };

  if (game.borrowStatus === "free") {
    return (
      <div className="flex gap-3">
        <button
          className="btn-primary"
          onClick={() => setVisible((v) => !v)}
          style={{ display: visible ? "block" : "none" }}
        >
          Borrow
        </button>

        {!visible && (
          <>
            <button
              className="btn-primary disabled:bg-greenDisabledV"
              onClick={handleBorrow}
              disabled={disabled}
            >
              Confirm
            </button>

            <button
              className="btn-primary"
              onClick={() => setVisible((v) => !v)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    );
  }
};

export default GameCard;
