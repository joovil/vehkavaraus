import apiFetch from "@/lib/utils/apiFetch";

export const fetchAllUsers = async () => {
  const res = await apiFetch("/users");
  return res;
};
