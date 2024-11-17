import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types/game";

export const fetchAllGames = async (): Promise<Game[]> => {
  const data = await apiFetch("/games");
  const games = await data.json();
  return games;
};
