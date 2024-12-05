import logger from "@/lib/utils/logger";
import { GameUpdate, NewGame } from "@/types";
import db from "..";

// TODO: Available_date should be removed from games and the date should be gotten
// from the latest_borrow

const getAllGames = async () => {
  logger.database("getAllGames");
  return await db.selectFrom("games").orderBy("id asc").selectAll().execute();
};

const getGameById = async (id: number) => {
  return db
    .selectFrom("games")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

const createGame = async (game: NewGame) => {
  return await db
    .insertInto("games")
    .values(game)
    .returningAll()
    .executeTakeFirstOrThrow();
};

const updateGame = async (id: number, game: GameUpdate) => {
  return await db
    .updateTable("games")
    .set(game)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

// FIXME: Timestamps are currently in UTF time, fix if time is left
const returnGame = async (borrowId: number) => {
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

const gameRepository = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  returnGame,
};

export default gameRepository;
