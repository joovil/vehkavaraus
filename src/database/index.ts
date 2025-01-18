import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@/lib/utils/envVariables";
import { Database } from "@/types";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { NeonDialect } from "kysely-neon";
import { Pool } from "pg";

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

let db: Kysely<Database>;

if (process.env.NODE_ENV == "development") {
  db = new Kysely<Database>({
    dialect: new NeonDialect({
      connectionString: process.env.DATABASE_URL,
    }),
    plugins: [new CamelCasePlugin()],
  });
} else {
  db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
}

export default db;
