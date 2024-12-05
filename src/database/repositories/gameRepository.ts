import logger from "@/lib/utils/logger";
import { GameUpdate, NewGame } from "@/types";
import db from "..";

export const getAllGames = async () => {
  logger.database("getAllGames");
  return await db.selectFrom("games").orderBy("id asc").selectAll().execute();
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

export const updateGame = async (id: number, game: GameUpdate) => {
  return await db
    .updateTable("games")
    .set(game)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

export const returnGame = async (borrowId: number) => {
  return await db.transaction().execute(async (trx) => {
    const borrow = await trx
      .updateTable("borrows")
      .set({ returnDate: new Date() })
      .where("id", "=", borrowId)
      .returning("borrows.gameId")
      .executeTakeFirstOrThrow();

    return await trx
      .updateTable("games")
      .set({
        availableDate: null,
        borrowStatus: "free",
      })
      .where("id", "=", borrow.gameId)
      .executeTakeFirstOrThrow();
  });
};
