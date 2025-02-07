import logger from "@/lib/utils/logger";
import { GameUpdate } from "@/types";
import { sql } from "kysely";
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

export const getGameByName = async (name: string) => {
  return db
    .selectFrom("games")
    .where("name", "=", name)
    .selectAll()
    .executeTakeFirst();
};

export const createGame = async (name: string, imageUrl: string) => {
  return await db
    .insertInto("games")
    .values({ name, imageUrl })
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

export const completeBorrow = async (borrowId: number) => {
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
        currentBorrow: null,
      })
      .where("id", "=", borrow.gameId)
      .executeTakeFirstOrThrow();
  });
};

export const lateGameCheck = async () => {
  await db
    .updateTable("games")
    .set("borrowStatus", "late")
    .where("availableDate", "<", () => sql`NOW()::TIMESTAMP`)
    .execute();
};
