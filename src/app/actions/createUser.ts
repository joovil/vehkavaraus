"use server";

import { createPerson } from "../../server/repositories/PersonRepository";
import bcryptjs from "bcryptjs";
import { ClientPerson } from "@/types";
import { NoResultError } from "kysely";

export const createUser = async (
  username: string,
  password: string,
  apartment: string
) => {
  validateApartment(apartment);

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
  } catch (error: any) {
    // if (error.code === "23505") {
    //   // PostgreSQL error code for unique violation
    //   throw new Error("Username already exists");
    // }
    // if (error instanceof NoResultError) {
    //   throw new Error(error.message);
    // }
    throw error;
  }
};

const validateApartment = (apartment: string) => {
  if (!/^[ab]\d{1,3}$/.test(apartment)) {
    throw Error("Apartment not valid");
  }
};
