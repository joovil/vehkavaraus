import { NewBorrow } from "@/types/types";
import { db } from "../database";

export const getAllBorrows = async () => {
  return await db.selectFrom("borrows").selectAll().execute();
};

export const getBorrowById = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrower", "=", id)
    .selectAll()
    .execute();
};

export const createBorrow = async (borrow: NewBorrow) => {
  return await db
    .insertInto("borrows")
    .values(borrow)
    .returningAll()
    .executeTakeFirstOrThrow();
};
