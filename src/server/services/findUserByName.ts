import { getUserByName } from "../repositories/userRepository";
import { ClientUser } from "@/types";
import { NoResultError } from "kysely";

export const findUserByName = async (username: string) => {
  try {
    const user = await getUserByName(username);
    const { id, username: fetchedUser, apartment, role } = user;

    const res: ClientUser = {
      id,
      username: fetchedUser,
      apartment,
      role,
    };

    return res;
  } catch (error) {
    if (error instanceof NoResultError) {
      throw Error("User not found");
    }
    throw Error("Unknown error");
  }
};
