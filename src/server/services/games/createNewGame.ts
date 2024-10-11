import { NewGame } from "@/lib/types";
import { createGame } from "../database/repositories/gameRepository";

export const createNewGame = async (name: string) => {
  const newGame: NewGame = { name };
  return await createGame(newGame);
};
