import { UserCredentials } from "@/types/types";
import apiFetch from "../../utils/apiFetch";

export const loginUser = async (credentials: UserCredentials) => {
  const res = await apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return res.json();
};
