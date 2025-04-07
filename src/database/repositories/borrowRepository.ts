import logger from "@/lib/utils/logger";
import { Borrow } from "@/types";
import db from "..";

export const getAllBorrows = async () => {
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

export const getBorrowById = async (id: number) => {
  return await db
    .selectFrom("borrows")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const getBorrowsByGameId = async (id: number) => {
  logger.database("getBorrowByGameId");
  return await db
    .selectFrom("borrows")
    .innerJoin("users", "users.id", "borrows.borrowerId")
    .where("borrows.gameId", "=", id)
    .select([
      "users.username",
      "users.apartment",
      "borrows.id",
      "borrows.borrowDate",
      "borrows.dueDate",
      "borrows.returnDate",
    ])
    .orderBy("borrows.id", "desc")
    .execute();
};

export const getBorrowByIdWithGame = async (userId: string) => {
  logger.database("getBorrowByIdWithGame");
  return await db
    .selectFrom("borrows")
    .innerJoin("games", "games.id", "borrows.gameId")
    .where("borrowerId", "=", userId)
    .where("borrows.returnDate", "is", null)
    .select([
      "games.name",
      "borrowStatus",
      "borrowDate",
      "dueDate",
      "borrows.id as borrowId",
      "borrows.gameId",
    ])
    .execute();
};

export const createBorrow = async (
  borrowerId: string,
  gameId: number,
): Promise<Borrow> => {
  return await db.transaction().execute(async (trx) => {
    const game = await trx
      .selectFrom("games")
      .where("id", "=", gameId)
      .select(["borrowStatus"])
      .executeTakeFirstOrThrow();

    if (game.borrowStatus !== "free") {
      throw new Error("Game is not available for borrowing");
    }

    const createdBorrow = await trx
      .insertInto("borrows")
      .values({ borrowerId, gameId })
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx
      .updateTable("games")
      .set({
        borrowStatus: "borrowed",
        availableDate: createdBorrow.dueDate,
        currentBorrow: createdBorrow.id,
      })
      .where("id", "=", gameId)
      .executeTakeFirstOrThrow();

    return createdBorrow;
  });
};

// const getBorrowByUserId = async (id: string) => {
//   return await db
//     .selectFrom("borrows")
//     .where("borrowerId", "=", id)
//     .selectAll()
//     .execute();
// };

// const getActiveBorrows = async (id: string) => {
//   return await db
//     .selectFrom("borrows")
//     .where("borrowerId", "=", id)
//     .where("returnDate", "<", new Date())
//     .selectAll()
//     .execute();
// };

// const updateBorrow = async (id: number, borrowUpdate: BorrowUpdate) => {
//   return await db
//     .updateTable("borrows")
//     .set(borrowUpdate)
//     .where("id", "=", id)
//     .executeTakeFirstOrThrow();
// };
