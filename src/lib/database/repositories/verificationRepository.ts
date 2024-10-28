import db from "..";

export const getAllVerifications = async () => {
  return await db.selectFrom("verifications").selectAll().execute();
};

export const getVerificationByKey = async (key: string) => {
  return await db
    .selectFrom("verifications")
    .where("verification_key", "=", key)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const getVerificationByUser = async (userId: string) => {
  return await db
    .selectFrom("verifications")
    .where("user_id", "=", userId)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const updateVerificationStatus = async (
  identifier: { userId?: string; verificationKey?: string },
  status: boolean
) => {
  const query = db.updateTable("verifications").set({ used: status });

  if (identifier.userId) {
    query.where("user_id", "=", identifier.userId);
  } else if (identifier.verificationKey) {
    query.where("verification_key", "=", identifier.verificationKey);
  } else {
    throw new Error("Either userId or verificationKey must be provided.");
  }

  return await query.executeTakeFirstOrThrow();
};
