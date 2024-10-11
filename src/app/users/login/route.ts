import { ClientUser, UserCredentials } from "@/lib/types";
import { getUserByName } from "@/server/database/repositories/userRepository";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "@/lib/envVariables";
import { NoResultError } from "kysely";

export const POST = async (req: Request) => {
  const credentials: UserCredentials = await req.json();

  try {
    const userToCompare = await getUserByName(credentials.username);
    const userForClient: ClientUser = userToCompare;

    const loginSuccess = await bcryptjs.compare(
      credentials.password,
      userToCompare.password_hash
    );

    if (loginSuccess) {
      const token = jwt.sign(userForClient, TOKEN_SECRET);
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
