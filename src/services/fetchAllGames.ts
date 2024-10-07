import apiFetch from "@/lib/apiFetch";

export const fetchAllGames = async () => {
  const res = await apiFetch("/games");
  return res;
};
