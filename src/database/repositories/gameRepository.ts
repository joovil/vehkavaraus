import logger from "@/lib/utils/logger";
import { GameUpdate, NewGame } from "@/types/game";
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

const getGamesWithCurrentBorrow = async () => {
  logger.database("getGamesWithCurrentBorrow");
  return await db
    .selectFrom("games")
    .leftJoin("borrows", "games.current_borrow", "borrows.id")
    .leftJoin("users", "users.id", "borrows.borrower")
    .select([
      "games.id",
      "games.name",
      "games.image",
      "games.borrow_status",
      "users.apartment",
      "borrows.borrow_date",
      "borrows.return_date",
    ])
    .orderBy("games.id asc")
    .execute();
};

// FIXME: Timestamps are currently in UTF time, fix if time is left
const returnGame = async (borrowId: number) => {
  return await db.transaction().execute(async (trx) => {
    const borrow = await trx
      .updateTable("borrows")
      .set({ return_date: new Date() })
      .where("id", "=", borrowId)
      .returning("borrows.game")
      .executeTakeFirstOrThrow();

    return await trx
      .updateTable("games")
      .set({
        available_date: null,
        borrow_status: "free",
        current_borrow: null,
      })
      .where("id", "=", borrow.game)
      .executeTakeFirstOrThrow();
  });
};

const gameRepository = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  getGamesWithCurrentBorrow,
  returnGame,
};

export default gameRepository;
