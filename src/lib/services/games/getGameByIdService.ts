import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types";

export const getGameByIdService = async (id: number): Promise<Game> => {
  const res = await apiFetch(`/games/${id}`);
  const data = await res.json();
  return data;
};
