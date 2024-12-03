"use server";

import gameRepository from "@/database/repositories/gameRepository";

export const getGamesWithCurrentBorrow = async () => {
  return gameRepository.getGamesWithCurrentBorrow();
};
