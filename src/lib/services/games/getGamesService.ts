import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types";

let cachedGames: Game[] | null = null;

export const getGamesService = async (): Promise<Game[]> => {
  if (cachedGames) {
    return cachedGames;
  }

  const res = await apiFetch("/games");
  const data = await res.json();
  cachedGames = data;

  return data;
};
