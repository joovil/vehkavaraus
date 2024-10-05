import { db } from "../utils/database";

export const getAllGames = async () => {
  return await db.selectFrom("game").selectAll().execute();
};
