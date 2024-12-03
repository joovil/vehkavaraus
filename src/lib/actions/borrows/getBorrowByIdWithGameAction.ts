"use server";

import borrowRepository from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";

export const getBorrowByIdWithGameAction = async () => {
  const session = await auth();

  return await borrowRepository.getBorrowByIdWithGame(session!.user.id);
};
