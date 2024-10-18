import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "../../types/types";
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
} from "@/lib/utils/envVariables";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: DB_NAME,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
