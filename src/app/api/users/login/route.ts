import { UserClient, UserCredentials } from "@/types/types";
import { getUserByName } from "@/lib/database/repositories/userRepository";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "@/lib/utils/envVariables";
import { NoResultError } from "kysely";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const credentials: UserCredentials = await req.json();

  try {
    const userToCompare = await getUserByName(credentials.username);

    const loginSuccess = await bcryptjs.compare(
      credentials.password,
      userToCompare.password_hash
    );

    const userForClient: UserClient = {
      id: userToCompare.id,
      username: userToCompare.username,
      apartment: userToCompare.apartment,
      role: userToCompare.role,
    };

    if (loginSuccess) {
      const token = jwt.sign(userForClient, TOKEN_SECRET);
      cookies().set("token", token);

      return Response.json({ token });
    } else {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof NoResultError) {
      message = "User not found";
    }

    return Response.json({ message }, { status: 404 });
  }
};
