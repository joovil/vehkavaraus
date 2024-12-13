"use server";

import { getGamesWithCurrentBorrow } from "@/database/repositories/borrowRepository";

export const getGamesWithCurrentBorrowAction = async () => {
  return getGamesWithCurrentBorrow();
};
