import apiFetch from "@/lib/utils/apiFetch";

export const gameReturnService = async (gameId: number) => {
  const res = await apiFetch(`/games/${gameId}`, {
    method: "POST",
  });
  const data = await res.json();
  return data;
};
