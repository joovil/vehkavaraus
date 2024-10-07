import apiFetch from "@/lib/apiFetch";

export const fetchUserById = async (id: string) => {
  const res = await apiFetch(`/users/id/${id}`);
  return res;
};
