import { getUserByName } from "@/server/repositories/userRepository";
import { TOKEN_SECRET } from "@/server/utils/envVariables";
import { ClientUser, UserCredentials } from "@/types";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (credentials: UserCredentials) => {
  const userToCompare = await getUserByName(credentials.username);
  const userForClient: ClientUser = userToCompare;

  const loginSuccess = await bcryptjs.compare(
    credentials.password,
    userToCompare.password_hash
  );

  if (loginSuccess) {
    const token = jwt.sign(userForClient, TOKEN_SECRET);
    return token;
  }

  throw Error("Wrong credentials");
};
