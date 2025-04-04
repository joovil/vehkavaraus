import "@/lib/utils/envConfig";
import { Database } from "@/types";
import { Client, neonConfig } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
} from "kysely";
import { NeonDialect } from "kysely-neon";
import * as path from "path";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const client = new Client(process.env.DATABASE_URL);
client.neonConfig.webSocketConstructor = ws;

const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [new CamelCasePlugin()],
});
export async function migrateToLatest() {
  const migrator = new Migrator({
    db,
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

  await db.destroy();
}

migrateToLatest();
