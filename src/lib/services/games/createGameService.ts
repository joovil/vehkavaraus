import apiFetch from "@/lib/utils/apiFetch";
import { NewGame } from "@/types";

export const createGameService = async (newGame: NewGame) => {
  const res = await apiFetch("/games", {
    method: "POST",
    body: JSON.stringify(newGame),
  });

  return res;
};
