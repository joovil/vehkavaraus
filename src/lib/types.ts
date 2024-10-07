import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export enum Roles {
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
}
export interface UserTable {
  id: Generated<string>;
  username: string;
  password_hash: string;
  apartment: string;
  role: Roles | undefined;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type ClientUser = Omit<User, "password_hash">;
export type UserCredentials = {
  username: string;
  password: string;
};

export interface GameTable {
  id: Generated<number>;
  name: string;
  borrow_status: BorrowStatuses;
}

export type Game = Selectable<GameTable>;
export type NewGame = Insertable<GameTable>;
export type GameUpdate = Updateable<GameTable>;

export interface BorrowTable {
  id: Generated<number>;
  borrower: string;
  game: number;
  borrow_date: ColumnType<Date, string, never>;
  return_date: ColumnType<Date | null, string | Date>;
}

export type Borrow = Selectable<BorrowTable>;
export type NewBorrow = Insertable<BorrowTable>;
export type BorrowUpdate = Updateable<BorrowTable>;
