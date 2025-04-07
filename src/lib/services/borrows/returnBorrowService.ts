import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types";

export const completeBorrowService = async (
  borrowId: number,
): Promise<Game> => {
  try {
    const res = await apiFetch(`/borrows/return/${borrowId}`, {
      method: "POST",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error) {
    console.error("Error completing borrow", error);
    throw error;
  }
};
