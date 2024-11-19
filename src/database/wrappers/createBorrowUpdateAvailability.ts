import { NewBorrow } from "@/types/borrow";
import { BorrowStatuses, GameUpdate } from "@/types/game";
import { createBorrow } from "../repositories/borrowRepository";
import { updateGame } from "../repositories/gameRepository";

export const createBorrowUpdateAvailability = async (borrow: NewBorrow) => {
  const createdBorrow = await createBorrow(borrow);
  const gameUpdate: GameUpdate = {
    available_date: createdBorrow.return_date,
    borrow_status: BorrowStatuses.enum.borrowed,
  };
  updateGame(borrow.game, gameUpdate);

  return createdBorrow;
};
