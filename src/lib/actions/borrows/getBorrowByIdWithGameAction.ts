"use server";

import { getBorrowByIdWithGame } from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";

export const getBorrowByIdWithGameAction = async () => {
  const session = await auth();

  return await getBorrowByIdWithGame(session!.user.id);
};
