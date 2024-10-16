import { UserClient } from "@/lib/types";
import { insertUser } from "@/server/database/repositories/userRepository";
import bcryptjs from "bcryptjs";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  const { username, password, email, apartment } = await req.json();

  if (!/^[ab]\d{1,3}$/.test(apartment)) {
    return Response.json({ error: "Apartment not valid" }, { status: 400 });
  }

  if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)) {
    return Response.json({ error: "Email not valid" }, { status: 400 });
  }

  try {
    const password_hash = await bcryptjs.hash(password, 10);

    const newUser = await insertUser({
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
    let message = "Unknown error";

    if (error instanceof DatabaseError) {
      if (error.code === "23514") {
        message = "Username too short";
      }
      if ((error.code = "23505")) {
        message = `Error in ${error.column}`;
      }
    }

    return Response.json({ message }, { status: 404 });
  }
};
