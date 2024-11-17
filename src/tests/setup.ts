import "@/lib/utils/envConfig";
import db from "@/lib/database";
import { sql } from "kysely";
import { beforeAll } from "vitest";

beforeAll(async () => {
  await sql`TRUNCATE TABLE borrows, borrows, verifications, users;`.execute(db);
});
