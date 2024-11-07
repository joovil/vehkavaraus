import { NewUser, UserUpdate } from "@/types/user";
import db from "..";

export const getAllUsers = async () => {
  return await db.selectFrom("users").selectAll().execute();
};

export const getUserById = async (id: string) => {
  return await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const getUserByName = async (username: string) => {
  return await db
    .selectFrom("users")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const createUser = async (newUser: NewUser) => {
  return await db
    .insertInto("users")
    .values(newUser)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateUser = async (id: string, updateWith: UserUpdate) => {
  return await db
    .updateTable("users")
    .set(updateWith)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
};
