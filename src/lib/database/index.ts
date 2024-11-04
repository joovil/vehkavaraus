import { Database } from "@/types/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../utils/envVariables";

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

export default db;
