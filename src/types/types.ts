import { z } from "zod";
import { BorrowTable } from "./borrow";
import { GameTable } from "./game";
import { UserTable } from "./user";
import { Verification } from "./verification";

export interface Database {
  users: UserTable;
  games: GameTable;
  borrows: BorrowTable;
  verifications: Verification;
}

export const UserCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserCredentials = z.infer<typeof UserCredentialsSchema>;
