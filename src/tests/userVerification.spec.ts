import userRepository from "@/database/repositories/userRepository";
import verificationRepository from "@/database/repositories/verificationRepository";
import { NewUser, RolesEnum, User } from "@/types/user";
import { Verification } from "@/types/verification";
import { randomUUID, UUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";

describe("User verification works", () => {
  const newUser: NewUser = {
    username: "John",
    password_hash: " hash",
    apartment: "A1",
    email: "mail@site.com",
  };
  let testUser: User;
  let verificationKey: UUID;

  beforeAll(async () => {
    testUser = await userRepository.createUser(newUser);
    verificationKey = randomUUID();
  });

  it("Adds verification record to database correctly", async () => {
    const vRecord = await verificationRepository.addVerificationRecord({
      verification_key: verificationKey,
      user_id: testUser.id,
    });

    const expectedRecord: Verification = {
      user_id: testUser.id,
      verification_key: verificationKey,
      used: false,
    };
    expect(vRecord).toEqual(expectedRecord);
  });

  it("Updates verification status and verification record", async () => {
    await verificationRepository.updateVerificationStatusAndRole(
      verificationKey
    );
    testUser = await userRepository.getUserById(testUser.id);
    expect(testUser.role).toBe(RolesEnum.enum.user);
  });
});
