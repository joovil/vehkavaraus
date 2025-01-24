import { Database } from "@/types";
import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<Database>): Promise<void> => {
  await sql`SET TIMEZONE='Europe/Helsinki'`.execute(db);
};

export const down = async (db: Kysely<Database>): Promise<void> => {
  await sql`SET TIMEZONE='UTC'`.execute(db);
};
