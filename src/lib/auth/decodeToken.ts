import { UserClient } from "@/types/user";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/envVariables";

export const decodeToken = (token: string): UserClient => {
  try {
    if (!token) {
      throw Error("No token");
    }

    const user = jwt.verify(token, TOKEN_SECRET) as UserClient;

    if (!(user.id || user.username || user.apartment || user.role)) {
      throw Error("Invalid token contents");
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      apartment: user.apartment,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};
