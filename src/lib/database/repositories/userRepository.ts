import { NewUser, RolesType } from "@/types/user";
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

export const updateUserRole = async (id: string, role: RolesType) => {
  await db
    .updateTable("users")
    .set({ role })
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

export const updateUserApartment = async (id: string, apartment: string) => {
  await db
    .updateTable("users")
    .set({ apartment })
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};
