import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import { addVerificationRecord } from "@/database/repositories/verificationRepository";
import { User } from "@/types";
import { randomUUID } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (user: User) => {
  const verificationKey = randomUUID();
  await addVerificationRecord(verificationKey, user.id);

  if (process.env.NODE_ENV === "development") return;
  // Send email
  await resend.emails.send({
    from: "noreply@vehkavaraus.fi",
    to: user.email,
    subject: "Verify your email",
    react: EmailVerificationTemplate({ user, verificationKey }),
  });
};
