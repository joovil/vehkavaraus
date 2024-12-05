import { NewVerification, RolesEnum } from "@/types";
import db from "..";
import { updateUser } from "./userRepository";

export const getVerificationByKey = async (key: string) => {
  return await db
    .selectFrom("verifications")
    .where("verification_key", "=", key)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const addVerificationRecord = async (
  newVerification: NewVerification
) => {
  return await db
    .insertInto("verifications")
    .values(newVerification)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateVerificationStatusAndRole = async (
  verificationKey: string
) => {
  console.log(verificationKey);
  const userWithId = await db
    .updateTable("verifications")
    .set("used", true)
    .where("verification_key", "=", verificationKey)
    .returning("user_id")
    .executeTakeFirstOrThrow();

  await updateUser(userWithId.user_id, {
    role: RolesEnum.Enum.user,
  });
};

// const getAllVerifications = async () => {
//   return await db.selectFrom("verifications").selectAll().execute();
// };

// const getVerificationByUser = async (userId: string) => {
//   return await db
//     .selectFrom("verifications")
//     .where("user_id", "=", userId)
//     .selectAll()
//     .executeTakeFirstOrThrow();
// };

// const deleteVerificationByUserId = async (id: string) => {
//   await db.deleteFrom("verifications").where("user_id", "=", id).execute();
// };
