import { Database } from "@/types";
import { Kysely } from "kysely";

export const up = async (db: Kysely<Database>): Promise<void> => {
  db.schema
    .alterTable("games")
    .addColumn("current_borrow", "integer", (col) =>
      col.references("borrows.id"),
    )
    .execute();
};

export const down = async (db: Kysely<Database>): Promise<void> => {
  db.schema.alterTable("games").dropColumn("current_borrow").execute();
};
