"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { getBorrowByIdWithGame } from "@/database/repositories/borrowRepository";

export const getBorrowByIdWithGameAction = async () => {
  const session = await auth();

  return await getBorrowByIdWithGame(session!.user.id);
};
