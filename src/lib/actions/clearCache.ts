"use server";

import { revalidatePath } from "next/cache";

export const clearTest = async () => {
  revalidatePath("/.");
};
