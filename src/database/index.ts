import { Database } from "@/types";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { NeonDialect } from "kysely-neon";
import { Pool } from "pg";

let db: Kysely<Database>;

if (process.env.NODE_ENV == "production") {
  db = new Kysely<Database>({
    dialect: new NeonDialect({
      connectionString: process.env.DATABASE_URL,
    }),
    plugins: [new CamelCasePlugin()],
  });
} else {
  db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT!),
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });
}

export default db;
