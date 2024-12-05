import { Borrow, BorrowUpdate, GameUpdate, NewBorrow } from "@/types";
import db from "..";

const getAllBorrows = async () => {
  return await db
    .selectFrom("borrows")
    .innerJoin("games", "games.id", "borrows.gameId")
    .select([
      "borrows.id",
      "games.name",
      "games.borrowStatus",
      "borrows.borrowDate",
      "borrows.returnDate",
    ])
    .execute();
};

const getBorrowById = async (id: number) => {
  return await db
    .selectFrom("borrows")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

const getBorrowByUserId = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrowerId", "=", id)
    .selectAll()
    .execute();
};

const getBorrowByGameId = async (id: number) => {
  return await db
    .selectFrom("borrows")
    .innerJoin("users", "users.id", "borrows.borrowerId")
    .where("borrows.gameId", "=", id)
    .select([
      "users.username",
      "borrows.id",
      "borrows.borrowDate",
      "borrows.returnDate",
    ])
    .execute();
};

const getActiveBorrows = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrowerId", "=", id)
    .where("returnDate", "<", new Date())
    .selectAll()
    .execute();
};

const createBorrow = async (borrow: NewBorrow): Promise<Borrow> => {
  return await db.transaction().execute(async (trx) => {
    const createdBorrow = await trx
      .insertInto("borrows")
      .values(borrow)
      .returningAll()
      .executeTakeFirstOrThrow();

    const gameUpdate: GameUpdate = {
      availableDate: createdBorrow.returnDate,
      borrowStatus: "borrowed",
    };

    await trx
      .updateTable("games")
      .set(gameUpdate)
      .where("id", "=", borrow.gameId)
      .executeTakeFirstOrThrow();

    return createdBorrow;
  });
};

// TODO: Not implemented this is only test code for the types
const updateBorrow = async (id: number, borrowUpdate: BorrowUpdate) => {
  return await db
    .updateTable("borrows")
    .set(borrowUpdate)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

const getBorrowByIdWithGame = async (borrowerId: string) => {
  return await db
    .selectFrom("borrows")
    .innerJoin("games", "games.id", "borrows.gameId")
    .where("borrowerId", "=", borrowerId)
    .where("borrows.returnDate", ">", new Date())
    .select([
      "games.name",
      "borrowStatus",
      "borrowDate",
      "returnDate",
      "borrows.id",
      "borrows.gameId",
    ])
    .execute();
};

const borrowRepository = {
  getAllBorrows,
  getBorrowById,
  getBorrowByUserId,
  getBorrowByGameId,
  getActiveBorrows,
  createBorrow,
  updateBorrow,
  getBorrowByIdWithGame,
};

export default borrowRepository;
