import { BorrowUpdate, NewBorrow } from "@/types/borrow";
import db from "..";

const getAllBorrows = async () => {
  return await db.selectFrom("borrows").selectAll().execute();
};

const getBorrowById = async (id: string) => {
  return await db
    .selectFrom("borrows")
    .where("borrower", "=", id)
    .selectAll()
    .execute();
};

const createBorrow = async (borrow: NewBorrow) => {
  return await db
    .insertInto("borrows")
    .values(borrow)
    .returningAll()
    .executeTakeFirstOrThrow();
};

// TODO: Not implemented this is only test code for the types
const updateBorrow = async (id: number, borrowUpdate: BorrowUpdate) => {
  return await db
    .updateTable("borrows")
    .set(borrowUpdate)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

const borrowRepository = {
  getAllBorrows,
  getBorrowById,
  createBorrow,
  updateBorrow,
};

export default borrowRepository;
