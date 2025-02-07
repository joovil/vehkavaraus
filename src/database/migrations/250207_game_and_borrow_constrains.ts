import { Database } from "@/types";
import { Kysely } from "kysely";

export const up = async (db: Kysely<Database>): Promise<void> => {
  await db.schema
    .alterTable("games")
    .addUniqueConstraint("games_name_unique_check", ["name"])
    .execute();

  await db.schema
    .alterTable("borrows")
    .alterColumn("game_id", (col) => col.dropNotNull())
    .execute();

  await db.schema
    .alterTable("games")
    .alterColumn("imageUrl", (col) => col.setNotNull())
    .execute();
};

export const down = async (db: Kysely<Database>): Promise<void> => {
  await db.schema
    .alterTable("games")
    .dropConstraint("games_name_unique_check")
    .execute();

  await db.schema
    .alterTable("games")
    .alterColumn("imageUrl", (col) => col.dropNotNull())
    .execute();
};
