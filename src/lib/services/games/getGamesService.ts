import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types";

export const getGamesService = async (): Promise<Game[]> => {
  try {
    const res = await apiFetch("/games");

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unable to fetch images");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
