import apiFetch from "@/lib/utils/apiFetch";
import { AdminGame } from "@/types";

export const adminGamesService = async (): Promise<AdminGame[]> => {
  const res = await apiFetch("/admin/games");
  return await res.json();
};
