import { TOKEN_SECRET } from "../utils/envVariables";
import { UserClient } from "../../types/types";
import jwt from "jsonwebtoken";

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
      username: user.username,
      apartment: user.apartment,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};
