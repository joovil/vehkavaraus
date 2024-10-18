import { NewUser, Roles } from "../../../types/types";
import { db } from "../database";

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

export const insertUser = async (user: NewUser) => {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateUserRole = async (id: string, role: Roles) => {
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
