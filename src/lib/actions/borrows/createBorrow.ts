import borrowRepository from "@/database/repositories/borrowRepository";
import gameRepository from "@/database/repositories/gameRepository";
import { Borrow, BorrowStatuses, GameUpdate, NewBorrow } from "@/types";

export const createBorrow = async (borrow: NewBorrow): Promise<Borrow> => {
  const createdBorrow = await borrowRepository.createBorrow(borrow);
  const gameUpdate: GameUpdate = {
    available_date: createdBorrow.returnDate,
    borrowStatus: BorrowStatuses.enum.borrowed,
  };
  gameRepository.updateGame(borrow.game, gameUpdate);

  return createdBorrow;
};
