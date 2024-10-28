import { BorrowUpdate, NewBorrow } from "@/types/borrow";
import db from "..";

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

// TODO: Not implemented this is only test code for the types
export const updateBorrow = async (id: number, borrowUpdate: BorrowUpdate) => {
  return await db
    .updateTable("borrows")
    .set(borrowUpdate)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};
