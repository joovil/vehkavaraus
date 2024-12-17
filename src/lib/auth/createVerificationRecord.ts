import { addVerificationRecord } from "@/database/repositories/verificationRepository";
import { randomUUID } from "crypto";

export const createVerificationRecord = async (userId: string) => {
  const verificationKey = randomUUID();
  return await addVerificationRecord(verificationKey, userId);
};
