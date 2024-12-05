import { NewUser, UserUpdate } from "@/types";
import db from "..";

const getAllUsers = async () => {
  return await db.selectFrom("users").selectAll().execute();
};

const getUserById = async (id: string) => {
  return await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirstOrThrow();
};

const getUserByName = async (username: string) => {
  return await db
    .selectFrom("users")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirstOrThrow();
};

const createUser = async (newUser: NewUser) => {
  return await db
    .insertInto("users")
    .values(newUser)
    .returningAll()
    .executeTakeFirstOrThrow();
};

const updateUser = async (id: string, updateWith: UserUpdate) => {
  return await db
    .updateTable("users")
    .set(updateWith)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
};

const deleteUser = async (id: string) => {
  return await db.deleteFrom("users").where("id", "=", id).execute();
};

const userRepository = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};

export default userRepository;
