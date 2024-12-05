"use server";

import { getBorrowByGameId } from "@/database/repositories/borrowRepository";

export const getBorrowByGameIdAction = async (id: number) => {
  // TODO: Only admins should be able to access this data
  return await getBorrowByGameId(id);
};
