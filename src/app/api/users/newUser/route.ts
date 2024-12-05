import { createUser } from "@/database/repositories/userRepository";
import { newUserVerification } from "@/lib/auth/newUserVerification";
import { NewUserSchema, UserClientSchema } from "@/types";
import bcryptjs from "bcryptjs";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const password_hash = await bcryptjs.hash(data.password, 10);

    const newUser = await createUser(
      NewUserSchema.parse({ ...data, password_hash })
    );

    newUserVerification(newUser);

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
