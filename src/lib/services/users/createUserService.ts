import apiFetch from "@/lib/utils/apiFetch";

export const createUserService = async (
  username: string,
  password: string,
  email: string,
  apartment: string,
) => {
  const res = apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      email,
      apartment,
    }),
  });
  return res;
};
