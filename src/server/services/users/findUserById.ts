import { DatabaseError } from "pg";
import { ClientUser } from "@/lib/types";
import { NoResultError } from "kysely";
import { getUserById } from "@/server/database/repositories/userRepository";

export const findUserById = async (id: string) => {
  try {
    const user = await getUserById(id);
    const { id: userId, username, apartment, role } = user;

    const res: ClientUser = {
      id: userId,
      username,
      apartment,
      role,
    };

    return res;
  } catch (error) {
    if (error instanceof NoResultError) {
      throw Error("User not found");
    }
    if (error instanceof DatabaseError) {
      if (error.code == "22P02") {
        throw Error("Invalid id");
      }
    }
    throw Error("Unknown error");
  }
};
