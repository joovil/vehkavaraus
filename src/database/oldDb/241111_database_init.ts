import { BorrowStatuses } from "@/types/borrow";
import { Database } from "@/types/types";
import { RolesEnum } from "@/types/user";
import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<Database>): Promise<void> => {
  await db.schema.createType("roles").asEnum(RolesEnum.options).execute();
  // CREATE TYPE roles AS ENUM ('unverified', 'user', 'admin');

  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("username", "text", (col) =>
      col
        .notNull()
        .unique()
        .check(sql`char_length(username) > 2`)
    )
    .addColumn("password_hash", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("apartment", "text", (col) => col.notNull())
    .addColumn("role", sql`roles`, (col) =>
      col.defaultTo(RolesEnum.Enum.unverified).notNull()
    )
    .execute();
  // CREATE TABLE users (
  //     id UUID PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
  //     username TEXT NOT NULL UNIQUE CHECK (char_length(username) > 2),
  //     password_hash TEXT NOT NULL,
  //     email TEXT NOT NULL,
  //     apartment TEXT NOT NULL,
  //     role roles DEFAULT 'unverified' NOT NULL
  // );

  await db.schema
    .createType("borrow_statuses")
    .asEnum(BorrowStatuses.options)
    .execute();
  // CREATE TYPE borrow_statuses AS ENUM ('free', 'borrowed', 'late');

  await db.schema
    .createTable("games")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("borrow_status", sql`borrow_statuses`, (col) =>
      col.defaultTo(BorrowStatuses.Enum.free).notNull()
    )
    .execute();
  // CREATE TABLE games (
  //     id SERIAL PRIMARY KEY,
  //     name TEXT NOT NULL,
  //     borrow_status borrow_statuses DEFAULT 'free'
  // );

  await db.schema
    .createTable("borrows")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("borrower", "uuid", (col) =>
      col.references("users.id").onDelete("no action")
    )
    .addColumn("game", "integer", (col) =>
      col.references("games.id").onDelete("no action")
    )
    .addColumn("borrow_date", "timestamp", (col) =>
      col.defaultTo(sql`current_date`)
    )
    .addColumn("return_date", "timestamp", (col) =>
      col.defaultTo(sql`current_date + interval '1 week'`)
    )
    .execute();
  // CREATE TABLE borrows (
  //     id SERIAL PRIMARY KEY,
  //     borrower UUID,
  //     game integer,
  //     borrow_date TIMESTAMP DEFAULT CURRENT_DATE,
  //     return_date TIMESTAMP DEFAULT CURRENT_DATE + interval '1 week',
  //     FOREIGN KEY (borrower) REFERENCES users(id),
  //     FOREIGN KEY (game) REFERENCES games(id)
  // );

  await db.schema
    .createTable("verifications")
    .addColumn("verification_key", "uuid", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.references("users.id").onDelete("cascade").notNull()
    )
    .addColumn("used", "boolean", (col) => col.defaultTo(false))
    .execute();
  // CREATE TABLE verifications (
  //     verification_key UUID PRIMARY KEY,
  //     user_id UUID NOT NULL,
  //     used BOOLEAN DEFAULT FALSE,
  //     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  // );
};
