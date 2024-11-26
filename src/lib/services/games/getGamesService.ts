import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types/game";

export const getGamesService = async (): Promise<Game[]> => {
  const res = await apiFetch("/games");
  const data = await res.json();
  return data;
};
