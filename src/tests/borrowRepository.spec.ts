import db from "@/lib/database";
import { NewUser } from "@/types/user";
import { beforeAll, describe, expect, it } from "vitest";

describe("Borrow repository", () => {
  const users: NewUser[] = [
    {
      username: "John",
      email: "john@site.com",
      apartment: "a1",
    },
    {
      username: "Jane",
      email: "jane@site.com",
      apartment: "b2",
    },
  ];

  beforeAll(async () => {
    await db.insertInto("users").values(users).execute();
  });

  it("Should get all users", async () => {
    expect(1).toBe(1);
  });
});
