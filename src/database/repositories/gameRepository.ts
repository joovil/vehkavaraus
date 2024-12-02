import { GameUpdate, NewGame } from "@/types/game";
import db from "..";

const getAllGames = async () => {
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

const gamesForAdminPanel = async () => {
  return db
    .selectFrom("games")
    .leftJoin(
      db
        .selectFrom("borrows")
        .select(["game", db.fn.max("id").as("max_id")])
        .groupBy("game")
        .as("b2"),
      "games.id",
      "b2.game"
    )
    .leftJoin("borrows", "b2.max_id", "borrows.id")
    .leftJoin("users", "users.id", "borrows.borrower")
    .select([
      "games.id",
      "games.name",
      "games.borrow_status",
      "users.apartment",
      "borrows.borrow_date",
      "borrows.return_date",
    ])
    .orderBy("games.id", "asc")
    .execute();
};

// FIXME: Timestamps are currently in UTF time, fix if time is left
const returnGame = async (borrowId: number, gameId: number) => {
  return await db.transaction().execute(async (trx) => {
    await trx
      .updateTable("games")
      .set({
        available_date: null,
        borrow_status: "free",
        current_borrow: null,
      })
      .where("id", "=", gameId)
      .executeTakeFirstOrThrow();

    return await trx
      .updateTable("borrows")
      .set({ return_date: new Date() })
      .where("id", "=", borrowId)
      .returning("borrows.id as returnedGameId")
      .executeTakeFirstOrThrow();
  });
};

const gameRepository = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  gamesForAdminPanel,
  returnGame,
};

export default gameRepository;
