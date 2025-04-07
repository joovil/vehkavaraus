import apiFetch from "@/lib/utils/apiFetch";

export const deleteGameService = async (id: number) => {
  try {
    const res = await apiFetch(`/admin/games/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};
