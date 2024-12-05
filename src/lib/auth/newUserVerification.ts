import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import verificationRepository from "@/database/repositories/verificationRepository";
import { User } from "@/types";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { RESEND_API_KEY } from "../utils/envVariables";

const resend = new Resend(RESEND_API_KEY);

export const newUserVerification = async (user: User) => {
  try {
    const verification_key = randomUUID();

    verificationRepository.addVerificationRecord({
      verification_key,
      user_id: user.id,
    });

    await resend.emails.send({
      from: "noreply@vehkavaraus.fi",
      to: user.email,
      subject: "Verify your email",
      react: EmailVerificationTemplate({ user, verification_key }),
    });
  } catch (error) {
    // TODO: Error handling
    throw error;
  }
};
