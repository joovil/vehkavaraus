import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import { addVerificationRecord } from "@/database/repositories/verificationRepository";
import { User } from "@/types";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { RESEND_API_KEY } from "./envVariables";

const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async (user: User) => {
  const verificationKey = randomUUID();
  await addVerificationRecord(verificationKey, user.id);

  // Send email
  await resend.emails.send({
    from: "noreply@vehkavaraus.fi",
    to: user.email,
    subject: "Verify your email",
    react: EmailVerificationTemplate({ user, verificationKey }),
  });
};
