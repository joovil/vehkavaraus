import apiFetch from "@/lib/utils/apiFetch";

export const fetchAllGames = async () => {
  const res = await apiFetch("/games");
  return res;
};
