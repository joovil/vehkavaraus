import apiFetch from "@/lib/utils/apiFetch";
import { HistoryItem } from "@/types";

export const getBorrowByGameIdService = async (
  id: number,
): Promise<HistoryItem[]> => {
  const res = await apiFetch(`/borrows/${id}`, { cache: "no-cache" });
  return await res.json();
};
