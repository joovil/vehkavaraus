import { Database } from "@/types";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
import * as path from "path";
import { Pool } from "pg";

const projectDir = process.cwd();
const devEnvFile = `${projectDir}\\.env.development`;
dotenv.config({ path: devEnvFile });

export const devDb = new Kysely<Database>({
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

export async function migrateToLatest() {
  const migrator = new Migrator({
    db: devDb,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "../."),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await devDb.destroy();
}

migrateToLatest();
