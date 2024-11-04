import { createUser } from "@/lib/database/repositories/userRepository";
import { UserClient } from "@/types/user";
import bcryptjs from "bcryptjs";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  try {
    const { username, password, email, apartment } = await req.json();

    if (!username) {
      return Response.json({ error: "Username missing" }, { status: 400 });
    }

    if (!/^[ab]\d{1,3}$/.test(apartment)) {
      return Response.json({ error: "Apartment not valid" }, { status: 400 });
    }

    if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)) {
      return Response.json({ error: "Email not valid" }, { status: 400 });
    }

    if (!password) {
      return Response.json({ error: "Password missing" }, { status: 400 });
    }
    const password_hash = await bcryptjs.hash(password, 10);

    const newUser = await createUser({
      username,
      password_hash,
      email,
      apartment,
    });

    const createdUser: UserClient = {
      id: newUser.id,
      username: newUser.username,
      apartment: newUser.apartment,
      role: newUser.role,
    };

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
