import db from "@/database";
import "@/lib/utils/envConfig";
import { sql } from "kysely";
import { beforeAll } from "vitest";

beforeAll(async () => {
  await sql`TRUNCATE TABLE borrows, borrows, verifications, users;`.execute(db);
});
