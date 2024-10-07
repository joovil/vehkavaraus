import apiFetch from "@/lib/apiFetch";

export const fetchUserByName = async (username: string) => {
  const res = await apiFetch(`/users/username/${username}`);
  return res;
};
