import { Database } from "@/types/types";
import { Kysely } from "kysely";

export const up = async (db: Kysely<Database>): Promise<void> => {
  db.schema
    .alterTable("games")
    .addColumn("available_date", "timestamp")
    .execute();
};

export const down = async (db: Kysely<Database>): Promise<void> => {
  db.schema.alterTable("games").dropColumn("available_date").execute();
};
