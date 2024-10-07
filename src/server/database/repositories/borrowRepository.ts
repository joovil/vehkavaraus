import { db } from "../database";

export const getAllBorrows = async () => {
  return await db.selectFrom("borrows").selectAll().execute();
};
