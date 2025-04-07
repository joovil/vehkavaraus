import apiFetch from "@/lib/utils/apiFetch";

export const createBorrowService = async (gameId: number) => {
  try {
    const body = {
      gameId,
    };

    const res = await apiFetch("/borrows", {
      method: "POST",
      body: JSON.stringify(body),
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
