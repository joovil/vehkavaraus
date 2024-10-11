import { NewGame } from "@/lib/types";
import { db } from "../database";

export const getAllGames = async () => {
  return await db.selectFrom("games").selectAll().execute();
};

export const getGameById = async (id: number) => {
  return db
    .selectFrom("games")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const createGame = async (game: NewGame) => {
  return await db
    .insertInto("games")
    .values(game)
    .returningAll()
    .executeTakeFirstOrThrow();
};
