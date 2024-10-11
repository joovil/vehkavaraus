import { cookies } from "next/headers";

export const tokenExtractor = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("Invalid token");
  }
  return token.value;
};
