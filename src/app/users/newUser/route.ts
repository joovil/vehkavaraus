import { ClientUser } from "@/lib/types";
import { insertUser } from "@/server/database/repositories/userRepository";
import bcryptjs from "bcryptjs";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  const { username, password, apartment } = await req.json();

  if (!/^[ab]\d{1,3}$/.test(apartment)) {
    throw Error("Apartment not valid");
  }

  try {
    const password_hash = await bcryptjs.hash(password, 10);

    const newUser = await insertUser({
      username,
      password_hash,
      apartment,
    });

    const createdUser: ClientUser = {
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
        message = "Username already in use";
      }
    }

    return Response.json({ message }, { status: 404 });
  }
};
