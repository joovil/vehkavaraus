import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import { createUser } from "@/database/repositories/userRepository";
import { addVerificationRecord } from "@/database/repositories/verificationRepository";
import { RESEND_API_KEY } from "@/lib/utils/envVariables";
import { hashPassword } from "@/lib/utils/hashPassword";
import logger from "@/lib/utils/logger";
import { randomUUID } from "crypto";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export const POST = async (req: Request) => {
  logger.logYellow("POST /signup");
  try {
    const { username, password, email, apartment } = await req.json();

    if (!username || !password || !email || !apartment) {
      return Response.json({ message: "Missing fields" });
    }

    // Create new user
    const passwordHash = await hashPassword(password);
    const user = await createUser({ username, passwordHash, email, apartment });

    // Create verification record
    const verificationKey = randomUUID();
    await addVerificationRecord(verificationKey, user.id);

    // Send email
    await resend.emails.send({
      from: "noreply@vehkavaraus.fi",
      to: user.email,
      subject: "Verify your email",
      react: EmailVerificationTemplate({ user, verificationKey }),
    });

    return Response.json({ message: "Email sent" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
