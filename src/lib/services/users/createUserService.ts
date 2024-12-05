import apiFetch from "@/lib/utils/apiFetch";
import { NewUser } from "@/types";

export const createUserService = async (newUser: NewUser) => {
  const res = apiFetch("/users/newUser", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  return res;
};
