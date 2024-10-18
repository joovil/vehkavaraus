import apiFetch from "@/lib/utils/apiFetch";

export const fetchUserByName = async (username: string) => {
  const res = await apiFetch(`/users/username/${username}`);
  return res;
};
