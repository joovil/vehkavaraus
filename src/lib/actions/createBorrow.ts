import borrowRepository from "@/database/repositories/borrowRepository";
import gameRepository from "@/database/repositories/gameRepository";
import { Borrow, NewBorrow } from "@/types/borrow";
import { BorrowStatuses, GameUpdate } from "@/types/game";

export const createBorrow = async (borrow: NewBorrow): Promise<Borrow> => {
  const createdBorrow = await borrowRepository.createBorrow(borrow);
  const gameUpdate: GameUpdate = {
    available_date: createdBorrow.return_date,
    borrow_status: BorrowStatuses.enum.borrowed,
  };
  gameRepository.updateGame(borrow.game, gameUpdate);

  return createdBorrow;
};
