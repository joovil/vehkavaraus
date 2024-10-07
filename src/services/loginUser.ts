import { UserCredentials } from "@/lib/types";
import apiFetch from "../lib/apiFetch";

export const loginUser = async (credentials: UserCredentials) => {
  const res = await apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return res;
};
