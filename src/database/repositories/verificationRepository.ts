import db from "..";

export const getVerificationByKey = async (key: string) => {
  return await db
    .selectFrom("verifications")
    .where("verificationKey", "=", key)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const addVerificationRecord = async (
  verificationKey: string,
  userId: string,
) => {
  return await db
    .insertInto("verifications")
    .values({ verificationKey, userId })
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateVerificationStatusAndRole = async (
  verificationKey: string,
) => {
  return db.transaction().execute(async (trx) => {
    const { userId } = await trx
      .updateTable("verifications")
      .set("used", true)
      .where("verificationKey", "=", verificationKey)
      .returning("userId")
      .executeTakeFirstOrThrow();

    return await trx
      .updateTable("users")
      .set({ role: "user" })
      .where("id", "=", userId)
      .returningAll()
      .executeTakeFirstOrThrow();
  });
};

export const deleteVerificationByUserId = async (id: string) => {
  await db.deleteFrom("verifications").where("userId", "=", id).execute();
};
