"use server";

import { getAllGames } from "@/database/repositories/gameRepository";

export const getAllGamesAction = async () => {
  return await getAllGames();
};
