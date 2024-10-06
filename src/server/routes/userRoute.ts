import { createPerson } from "../repositories/PersonRepository";
import bcryptjs from "bcryptjs";
import { ClientPerson } from "@/types";
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

    const newPerson = await createPerson({
      username,
      password_hash,
      apartment,
    });

    const returnPerson: ClientPerson = {
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
