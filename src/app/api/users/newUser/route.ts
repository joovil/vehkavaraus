import { SendVerificationEmail } from "@/lib/auth/sendEmail";
import { createUser } from "@/lib/database/repositories/userRepository";
import { addVerificationRecord } from "@/lib/database/repositories/verificationRepository";
import { NewUserSchema, UserClientSchema } from "@/types/user";
import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const password_hash = await bcryptjs.hash(data.password, 10);

    const newUser = await createUser(
      NewUserSchema.parse({ ...data, password_hash })
    );

    const verification_key = randomUUID();

    SendVerificationEmail(newUser, verification_key);
    addVerificationRecord({ user_id: newUser.id, verification_key });

    const createdUser = UserClientSchema.parse(newUser);
    return Response.json({ returnPerson: createdUser });
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (error.code === "23514") {
        return Response.json({ error: "Username too short" }, { status: 400 });
      }
      if ((error.code = "23505")) {
        return Response.json(
          { error: "Username already in use" },
          { status: 409 }
        );
      }
    }

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
