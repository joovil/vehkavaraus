import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerificationTableSchema = z.object({
  verification_key: z.string(),
  user_id: z.string(),
  used: z.boolean(),
});

export type VerificationTable = z.infer<typeof VerificationTableSchema>;

export type Verification = VerificationTable;
export type NewVerification = Omit<VerificationTable, "verification_key" | "user_id">;
export type VerificationUpdate = Partial<VerificationTable>;
