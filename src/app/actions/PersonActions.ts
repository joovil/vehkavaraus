"use server";

import { updatePersonApartment } from "../../server/repositories/PersonRepository";

export const actUpdatePersonApartment = async (id: string, apartment: string) => {
  return await updatePersonApartment(id, apartment);
}