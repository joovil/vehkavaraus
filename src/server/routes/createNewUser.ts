import { insertUser } from "../repositories/UserRepository";
import bcryptjs from "bcryptjs";
import { ClientUser } from "@/types";
import { DatabaseError } from "pg";

export const createUser = async (
  username: string,
  password: string,
  apartment: string
) => {
  if (!/^[ab]\d{1,3}$/.test(apartment)) {
    throw Error("Apartment not valid");
  }

  try {
    const password_hash = await bcryptjs.hash(password, 10);

    const newPerson = await insertUser({
      username,
      password_hash,
      apartment,
    });

    const returnPerson: ClientUser = {
      id: newPerson.id,
      username: newPerson.username,
      apartment: newPerson.apartment,
      role: newPerson.role,
    };

    return returnPerson;
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (error.code == "23514") {
        throw Error("Username too short");
      }
      if ((error.code = "23505")) {
        throw Error("Username already in use");
      }
    }
    throw Error("Unhandled error");
  }
};
