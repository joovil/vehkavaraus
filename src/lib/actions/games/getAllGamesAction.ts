"use server";

import { getAllGames } from "@/database/repositories/gameRepository";
import { Game } from "@/types";

export const getAllGamesAction = async (): Promise<Game[]> => {
  return await getAllGames();
};
