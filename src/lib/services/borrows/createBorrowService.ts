import apiFetch from "@/lib/utils/apiFetch";

export const createBorrowService = async (gameId: number) => {
  const body = {
    gameId,
  };

  const res = await apiFetch("/borrows", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return await res.json();
};
