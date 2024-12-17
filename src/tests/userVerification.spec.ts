import {
  createUser,
  getUserById,
} from "@/database/repositories/userRepository";
import {
  addVerificationRecord,
  updateVerificationStatusAndRole,
} from "@/database/repositories/verificationRepository";
import { NewUser, RolesEnum, User, Verification } from "@/types";
import { randomUUID, UUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";

describe("User verification works", () => {
  const newUser: NewUser = {
    username: "John",
    passwordHash: " hash",
    apartment: "A1",
    email: "mail@site.com",
  };
  let testUser: User;
  let verificationKey: UUID;

  beforeAll(async () => {
    testUser = await createUser(newUser);
    verificationKey = randomUUID();
  });

  it("Adds verification record to database correctly", async () => {
    const vRecord = await addVerificationRecord({
      verificationKey: verificationKey,
      userId: testUser.id,
    });

    const expectedRecord: Verification = {
      userId: testUser.id,
      verificationKey: verificationKey,
      used: false,
    };
    expect(vRecord).toEqual(expectedRecord);
  });

  it("Updates verification status and verification record", async () => {
    await updateVerificationStatusAndRole(verificationKey);
    testUser = await getUserById(testUser.id);
    expect(testUser.role).toBe(RolesEnum.enum.user);
  });
});
