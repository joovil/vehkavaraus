import { BorrowTable } from "./borrow";
import { GameTable } from "./game";
import { UserTable } from "./user";
import { VerificationTable } from "./verification";
import { z } from "zod";

export interface Database {
  users: UserTable;
  games: GameTable;
  borrows: BorrowTable;
  verifications: VerificationTable;
}

export const UserCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserCredentials = z.infer<typeof UserCredentialsSchema>;
