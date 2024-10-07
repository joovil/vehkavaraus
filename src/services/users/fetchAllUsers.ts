import apiFetch from "@/lib/apiFetch";

export const fetchAllUsers = async () => {
  const res = await apiFetch("/users");
  return res;
};
