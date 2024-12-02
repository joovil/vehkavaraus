"use server";

import gameRepository from "@/database/repositories/gameRepository";

export const getAllGamesAction = async () => {
  return await gameRepository.getAllGames();
};
