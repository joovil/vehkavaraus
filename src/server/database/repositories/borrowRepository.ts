import { db } from "../utils/database";

export const getAllBorrows = async () => {
  return await db.selectFrom("borrows").selectAll().execute();
};
