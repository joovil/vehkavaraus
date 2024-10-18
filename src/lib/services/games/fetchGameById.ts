import apiFetch from "@/lib/utils/apiFetch";

export const fetchGameById = async (id: string) => {
  const res = await apiFetch(`/games/${id}`);
  return res;
};
