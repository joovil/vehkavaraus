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
  person: PersonTable;
  game: GameTable;
  borrow: BorrowTable;
}

export interface PersonTable {
  id: Generated<string>;
  apartment: string;
  password_hash: string;
  role: Roles;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;

export type ClientPerson = Omit<Person, "password_hash">;

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
  person: string;
  game: number;
  borrow_date: ColumnType<Date, string, never>;
  return_date: ColumnType<Date | null, string | Date>;
}

export type Borrow = Selectable<BorrowTable>;
export type NewBorrow = Insertable<BorrowTable>;
export type BorrowUpdate = Updateable<BorrowTable>;
