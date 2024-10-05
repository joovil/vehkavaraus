"use server";

import { updatePersonApartment } from "../../server/Routes/PersonRoutes";

export const actUpdatePersonApartment = async (id: string, apartment: string) => {
  return await updatePersonApartment(id, apartment);
}