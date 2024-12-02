import db from "@/database";
import userRepository from "@/database/repositories/userRepository";
import { NewUser, NewUserSchema, RolesEnum, UserUpdate } from "@/types/user";
import { UUID } from "crypto";
import { sql } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";

describe("User repository", () => {
  const users: NewUser[] = [
    {
      username: "John",
      password_hash: "hash",
      email: "john@site.com",
      apartment: "a1",
    },
    {
      username: "Jane",
      password_hash: "hash2",
      email: "jane@site.com",
      apartment: "b2",
    },
  ];

  beforeEach(async () => {
    await sql`TRUNCATE table ${sql.table("users")} CASCADE`.execute(db);
    await db.insertInto("users").values(users).execute();
  });

  describe("Getting users from db", () => {
    it("Should get all users", async () => {
      const res = await userRepository.getAllUsers();
      expect(res.length).toBe(2);
    });

    it("Should get user by username", async () => {
      const user = await userRepository.getUserByName(users[0].username);
      expect(NewUserSchema.parse(user)).toStrictEqual(users[0]);
    });

    it("Should get user by id", async () => {
      const users = await userRepository.getAllUsers();
      const userId = users[0].id;

      const user = await userRepository.getUserById(userId);
      expect(user).toStrictEqual(users[0]);
    });

    it("Should create id and role when added to db", async () => {
      const users = await userRepository.getAllUsers();
      expect(users[0].id).toBeDefined();
      expect(users[0].role).toBe(RolesEnum.Enum.unverified);
    });
  });

  describe("Creating and updating users", () => {
    it("Should create user correctly", async () => {
      const newUser: NewUser = {
        username: "Bob",
        password_hash: "hash3",
        email: "bob@site.com",
        apartment: "a3",
      };

      const createdUser = await userRepository.createUser(newUser);
      expect(NewUserSchema.parse(createdUser)).toStrictEqual(newUser);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.role).toBe(RolesEnum.Enum.unverified);
    });

    it("Should update user role", async () => {
      const user = (await userRepository.getAllUsers())[0];
      const update: UserUpdate = {
        role: RolesEnum.Enum.user,
      };

      const res = await userRepository.updateUser(user.id, update);
      expect(res.role).toBe(RolesEnum.Enum.user);
    });

    it("Should update user apartment", async () => {
      const user = (await userRepository.getAllUsers())[0];
      const update: UserUpdate = {
        apartment: "b4",
      };

      const res = await userRepository.updateUser(user.id, update);
      expect(res.apartment).toBe("b4");
    });
  });

  describe("Invalid operations should not work", () => {
    it("Should cause an error with invalid id", async () => {
      const invalidId: UUID = "a-b-c-d-e";
      await expect(userRepository.getUserById(invalidId)).rejects.toThrow();
    });

    it("Should cause an error with invalid username", async () => {
      const invalidUsername = "invalidUser";
      await expect(
        userRepository.getUserByName(invalidUsername)
      ).rejects.toThrow();
    });
  });
});
