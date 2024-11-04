import { ColumnType } from "kysely";
import { z } from "zod";
import { BorrowTable } from "./borrow";
import { GameTable } from "./game";
import { UserTable } from "./user";
import { VerificationTable } from "./verification";

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

export type TableType<S, I = S, U = S> = {
  [K in keyof S]: ColumnType<
    K extends keyof S ? S[K] : never,
    K extends keyof I ? I[K] : never,
    K extends keyof U ? Exclude<U[K], undefined> : never
  >;
};
