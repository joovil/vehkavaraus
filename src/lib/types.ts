import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export enum Roles {
  "unverified",
  "user",
  "admin",
}

export enum BorrowStatuses {
  "free",
  "borrowed",
  "late",
}

export interface Database {
  users: UserTable;
  games: GameTable;
  borrows: BorrowTable;
  verifications: VerificationTable;
}

export interface UserTable {
  id: Generated<string>;
  username: string;
  password_hash: string;
  email: string;
  apartment: string;
  role: Roles | undefined;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type UserClient = Omit<User, "password_hash" | "email">;

export type UserCredentials = {
  username: string;
  password: string;
};

export interface GameTable {
  id: Generated<number>;
  name: string;
  borrow_status: BorrowStatuses | undefined;
}

export type Game = Selectable<GameTable>;
export type NewGame = Insertable<GameTable>;
export type GameUpdate = Updateable<GameTable>;

export interface BorrowTable {
  id: Generated<number>;
  borrower: string;
  game: number;
  borrow_date: ColumnType<Date, string, never> | undefined;
  return_date: ColumnType<Date | null, string | Date> | undefined;
}

export type Borrow = Selectable<BorrowTable>;
export type NewBorrow = Insertable<BorrowTable>;
export type BorrowUpdate = Updateable<BorrowTable>;

export interface VerificationTable {
  verification_key: ColumnType<string, string, never>;
  user_id: ColumnType<string, string, never>;
  used: ColumnType<boolean, never, boolean>;
}

export type Verification = Selectable<VerificationTable>;
export type NewVerification = Insertable<VerificationTable>;
export type VerificationUpdate = Updateable<VerificationTable>;
