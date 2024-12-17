import EmailVerificationTemplate from "@/components/EmailVerificationTemplate";
import { createUser } from "@/database/repositories/userRepository";
import { addVerificationRecord } from "@/database/repositories/verificationRepository";
import { RESEND_API_KEY } from "@/lib/utils/envVariables";
import { hashPassword } from "@/lib/utils/hashPassword";
import { UserToCreateSchema } from "@/types";
import { randomUUID } from "crypto";
import { DatabaseError } from "pg";
import { Resend } from "resend";
import { ZodError } from "zod";

const resend = new Resend(RESEND_API_KEY);

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (!body.username || !body.password || !body.email || !body.apartment) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const userToCreate = UserToCreateSchema.parse(body);

    // Create new user
    const passwordHash = await hashPassword(userToCreate.password);
    const user = await createUser({
      username: body.username,
      passwordHash,
      email: body.email,
      apartment: body.apartment,
    });

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
    if (error instanceof DatabaseError) {
      if (error.code === "23514") {
        return Response.json({ error: "Username too short" }, { status: 400 });
      }
      if ((error.code = "23505")) {
        return Response.json(
          { error: "Username already in use" },
          { status: 409 },
        );
      }

      if (error instanceof ZodError) {
        return Response.json(
          { error: error.issues[0].message },
          { status: 400 },
        );
      }

      if (error instanceof Error) {
        return Response.json({ error: error.message }, { status: 400 });
      }
    }
  }
};
