import apiFetch from "@/lib/utils/apiFetch";

export const deleteGameService = async (id: number) => {
  return await apiFetch(`/admin/games/${id}`, { method: "DELETE" });
};
