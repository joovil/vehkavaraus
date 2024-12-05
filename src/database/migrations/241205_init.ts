import { BorrowStatuses, Database, RolesEnum } from "@/types";
import { Kysely, sql } from "kysely";
export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createType("role")
    .asEnum(["unverified", "user", "admin"])
    .execute();

  await db.schema
    .createType("borrow_status")
    .asEnum(["free", "borrowed", "late"])
    .execute();

  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("username", "text", (col) =>
      col
        .notNull()
        .unique()
        .check(sql`char_length(username) > 2`)
    )
    .addColumn("password_hash", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("apartment", "text", (col) => col.notNull())
    .addColumn("role", sql`role`, (col) =>
      col.defaultTo(RolesEnum.Enum.unverified).notNull()
    )
    .execute();

  await db.schema
    .createTable("games")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("borrow_status", sql`borrow_status`, (col) =>
      col.defaultTo(BorrowStatuses.Enum.free).notNull()
    )
    .addColumn("available_date", "timestamp")
    .addColumn("image_url", "text")
    .execute();

  await db.schema
    .createTable("borrows")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("borrower_id", "uuid", (col) =>
      col.references("users.id").onDelete("no action").notNull()
    )
    .addColumn("game_id", "integer", (col) =>
      col.references("games.id").onDelete("no action").notNull()
    )
    .addColumn("borrow_date", "timestamp", (col) =>
      col.defaultTo(sql`current_date`).notNull()
    )
    .addColumn("return_date", "timestamp")
    .addColumn("due_date", "timestamp", (col) =>
      col.defaultTo(sql`current_date + interval '1 week'`)
    )
    .execute();

  await db.schema
    .createTable("verifications")
    .addColumn("verification_key", "uuid", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.references("users.id").onDelete("cascade").notNull()
    )
    .addColumn("used", "boolean", (col) => col.defaultTo(false).notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("verifications").execute();
  await db.schema.dropTable("borrows").execute();
  await db.schema.dropTable("games").execute();
  await db.schema.dropTable("users").execute();
  await db.schema.dropType("role").execute();
  await db.schema.dropType("borrow_status").execute();
}
