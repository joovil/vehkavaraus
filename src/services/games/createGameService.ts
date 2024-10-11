import apiFetch from "@/lib/apiFetch";
import { NewGame } from "@/lib/types";

export const createGameService = async (newGame: NewGame) => {
  const res = await apiFetch("/games", {
    method: "POST",
    body: JSON.stringify(newGame),
  });

  return res;
};
