import { createUser } from "@/database/repositories/userRepository";
import { hashPassword } from "@/lib/utils/hashPassword";
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail";
import { UserToCreateSchema } from "@/types";
import { DatabaseError } from "pg";
import { ZodError } from "zod";

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

    sendVerificationEmail(user);

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
