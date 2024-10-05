import { db } from "../utils/database";
import { NewPerson, Roles } from "../../types";

export const getAllPersons = async () => {
  return await db.selectFrom("person").selectAll().execute();
};

export const getPersonById = async (id: string) => {
  return await db
    .selectFrom("person")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const createPerson = async (person: NewPerson) => {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updatePersonRole = async (id: string, role: Roles) => {
  await db.updateTable("person").set({ role }).where("id", "=", id).execute();
  return await getPersonById(id);
};

export const updatePersonApartment = async (id: string, apartment: string) => {
  await db
    .updateTable("person")
    .set({ apartment })
    .where("id", "=", id)
    .execute();

  return await getPersonById(id);
};
