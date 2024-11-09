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
  userId: string,
  verificationKey: string
) => {
  // Check that user is not already verified
  const alreadyVerified = await db
    .selectFrom("verifications")
    .where("user_id", "=", userId)
    .executeTakeFirst();

  if (alreadyVerified) {
    throw Error("User already confirmed");
  }

  // Check that key is not already used
  const keyUsed = await db
    .selectFrom("verifications")
    .where("verification_key", "=", verificationKey)
    .executeTakeFirst();

  if (keyUsed) {
    throw Error("Key already used");
  }

  await db
    .updateTable("verifications")
    .set("used", true)
    .where("user_id", "=", userId)
    .executeTakeFirstOrThrow();
};
