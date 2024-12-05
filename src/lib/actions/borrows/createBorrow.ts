import { updateGame } from "@/database/repositories/gameRepository";
import { Borrow, BorrowStatuses, GameUpdate, NewBorrow } from "@/types";

export const createBorrow = async (borrow: NewBorrow): Promise<Borrow> => {
  const createdBorrow = await createBorrow(borrow);
  const gameUpdate: GameUpdate = {
    availableDate: createdBorrow.returnDate,
    borrowStatus: BorrowStatuses.enum.borrowed,
  };
  updateGame(borrow.gameId, gameUpdate);

  return createdBorrow;
};
