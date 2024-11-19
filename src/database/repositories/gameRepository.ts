import { GameUpdate, NewGame } from "@/types/game";
import db from "..";

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

export const updateGame = async (id: number, game: GameUpdate) => {
  return await db
    .updateTable("games")
    .set(game)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

export const gamesForAdminPanel = async () => {
  return db
    .selectFrom("games")
    .leftJoin("borrows", "borrows.game", "games.id")
    .leftJoin("users", "borrows.borrower", "users.id")
    .select([
      "games.id",
      "games.name",
      "games.borrow_status",
      "users.apartment",
      "borrows.borrow_date",
      "borrows.return_date",
    ])
    .execute();
};
