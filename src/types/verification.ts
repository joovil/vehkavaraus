import { z } from "zod";

export const VerificationSchema = z.object({
  verification_key: z.string(),
  user_id: z.string(),
  used: z.boolean(),
});

export const NewVerificationSchema = VerificationSchema.pick({ user_id: true });
export const VerificationUpdateSchema = VerificationSchema.pick({ used: true });

export type Verification = z.TypeOf<typeof VerificationSchema>;
export type NewVerification = z.TypeOf<typeof NewVerificationSchema>;
export type VerificationUpdate = z.TypeOf<typeof VerificationUpdateSchema>;
