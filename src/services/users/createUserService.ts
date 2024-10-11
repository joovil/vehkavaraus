import apiFetch from "@/lib/apiFetch";
import { NewUser } from "@/lib/types";

export const createUserService = async (newUser: NewUser) => {
  const res = apiFetch("/users/newUser", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  return res;
};
