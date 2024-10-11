import { getGameById } from "@/server/database/repositories/gameRepository";

export const findGameById = async (id: number) => {
  try {
    const game = await getGameById(id);

    return game;
  } catch (error) {
    if (error instanceof Error) {
      throw Error("Game not found");
    }
    throw Error("Unhandled error");
  }
};
