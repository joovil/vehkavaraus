import "@/lib/utils/envConfig";

import db from "@/database";
import { sql } from "kysely";
import { beforeAll } from "vitest";

beforeAll(async () => {
  await sql`TRUNCATE TABLE borrows, games, verifications, users;`.execute(db);
});
