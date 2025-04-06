import apiFetch from "@/lib/utils/apiFetch";
import { HistoryItem } from "@/types";

export const getBorrowByGameIdService = async (
  id: number,
): Promise<HistoryItem[]> => {
  try {
    const res = await apiFetch(`/borrows/${id}`, { cache: "no-cache" });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching game borrow history", error);
    throw error;
  }
};
