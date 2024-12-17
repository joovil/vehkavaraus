import { z } from "zod";
import { TableType } from "./types";

export const VerificationSchema = z.object({
  verificationKey: z.string().uuid(),
  userId: z.string().uuid(),
  used: z.boolean(),
});

export const NewVerificationSchema = VerificationSchema.pick({
  userId: true,
  verificationKey: true,
});
export const VerificationUpdateSchema = VerificationSchema.pick({ used: true });

export type Verification = z.TypeOf<typeof VerificationSchema>;
export type NewVerification = z.TypeOf<typeof NewVerificationSchema>;
export type VerificationUpdate = z.TypeOf<typeof VerificationUpdateSchema>;

export type VerificationTable = TableType<
  Verification,
  NewVerification,
  VerificationUpdate
>;
