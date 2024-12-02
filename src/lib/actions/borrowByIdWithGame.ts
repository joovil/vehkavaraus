"use server";

import borrowRepository from "@/database/repositories/borrowRepository";
import { auth } from "../utils/auth";

export const borrowByIdWithGame = async () => {
  const session = await auth();

  return await borrowRepository.getBorrowByIdWithGame(session!.user.id);
};
