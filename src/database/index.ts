import { Database } from "@/types";
import { CamelCasePlugin, Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     database: DB_NAME,
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     port: DB_PORT,
//     max: 10,
//   }),
// });

const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [new CamelCasePlugin()],
});

export default db;
