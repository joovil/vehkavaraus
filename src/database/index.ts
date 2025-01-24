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
import { lateGameJob } from "./cron/updateLateStatus";

let db: Kysely<Database>;

const devDb = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [new CamelCasePlugin()],
});

const prodDb = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: DB_NAME,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});

if (process.env.NODE_ENV == "development") {
  db = devDb;
} else {
  db = prodDb;
}

// Cron jobs
lateGameJob.start();
console.log("Jobs started");

export default db;
