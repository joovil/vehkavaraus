import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import { User } from "@/types/user";
import { Resend } from "resend";
import { RESEND_API_KEY } from "../utils/envVariables";

const resend = new Resend(RESEND_API_KEY);

export const SendVerificationEmail = async (user: User) => {
  try {
    await resend.emails.send({
      from: "noreply@vehkavaraus.fi",
      to: user.email,
      subject: "Verify your email",
      react: EmailVerificationTemplate({ user }),
    });
  } catch (error) {
    // TODO: Error handling
    throw error;
  }
};
