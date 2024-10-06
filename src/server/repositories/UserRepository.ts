import { db } from "../utils/database";
import { NewUser, Roles } from "../../types";

export const getAllUsers = async () => {
  return await db.selectFrom("user").selectAll().execute();
};

export const getUserById = async (id: string) => {
  return await db
    .selectFrom("user")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const insertUser = async (user: NewUser) => {
  return await db
    .insertInto("user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateUserRole = async (id: string, role: Roles) => {
  await db.updateTable("user").set({ role }).where("id", "=", id).execute();
  return await getUserById(id);
};

export const updateUserApartment = async (id: string, apartment: string) => {
  await db
    .updateTable("user")
    .set({ apartment })
    .where("id", "=", id)
    .execute();

  return await getUserById(id);
};
