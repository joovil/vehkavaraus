import apiFetch from "@/lib/utils/apiFetch";
import { AdminGame } from "@/types";

export const fetchAllAdminGames = async (): Promise<AdminGame[]> => {
  try {
    const res = await apiFetch("/admin/games");
    return await res.json();
  } catch (error) {
    throw error;
  }
};
