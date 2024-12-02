import { Borrow, BorrowUpdate, NewBorrow } from "@/types/borrow";
import { GameUpdate } from "@/types/game";
import db from "..";

const getAllBorrows = async () => {
  return await db
    .selectFrom("borrows")
    .innerJoin("games", "games.id", "borrows.game")
    .select([
      "borrows.id",
      "games.name as game",
      "games.borrow_status",
      "borrows.borrow_date",
      "borrows.return_date",
    ])
    .execute();
};

const getBorrowByUserId = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrower", "=", id)
    .selectAll()
    .execute();
};

const getActiveBorrows = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrower", "=", id)
    .where("return_date", "<", new Date())
    .selectAll()
    .execute();
};

const getBorrowById = async (id: number) => {
  return await db
    .selectFrom("borrows")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

const createBorrow = async (borrow: NewBorrow): Promise<Borrow> => {
  return await db.transaction().execute(async (trx) => {
    const createdBorrow = await trx
      .insertInto("borrows")
      .values(borrow)
      .returningAll()
      .executeTakeFirstOrThrow();

    const gameUpdate: GameUpdate = {
      available_date: createdBorrow.return_date,
      borrow_status: "borrowed",
      current_borrow: createdBorrow.id,
    };

    await trx
      .updateTable("games")
      .set(gameUpdate)
      .where("id", "=", borrow.game)
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
    .innerJoin("games", "games.id", "borrows.game")
    .where("borrower", "=", borrowerId)
    .where("borrows.return_date", ">", new Date())
    .select([
      "games.name",
      "borrow_status",
      "borrow_date",
      "return_date",
      "borrows.id as borrowId",
      "games.id as gameId",
    ])
    .execute();
};

const borrowRepository = {
  getAllBorrows,
  getBorrowByUserId,
  getBorrowById,
  getActiveBorrows,
  createBorrow,
  updateBorrow,
  getBorrowByIdWithGame,
};

export default borrowRepository;
