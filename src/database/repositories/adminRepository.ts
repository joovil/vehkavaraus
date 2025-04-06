import { AdminGame } from "@/types";
import db from "..";

export const getAdminGames = async (): Promise<AdminGame[]> => {
  return await db
    .selectFrom("games as g")
    .leftJoin("borrows as b", "b.id", "g.currentBorrow")
    .leftJoin("users as u", "u.id", "b.borrowerId")
    .select([
      "g.id as gameId",
      "g.name as gameName",
      "g.borrowStatus",
      "g.imageUrl",
      "b.borrowDate",
      "b.dueDate",
      "b.id as borrowId",
      "u.username",
      "u.apartment",
    ])
    .orderBy("g.id", "asc")
    .execute();
};
