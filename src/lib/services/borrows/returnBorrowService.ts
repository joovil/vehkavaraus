import apiFetch from "@/lib/utils/apiFetch";

const returnBorrowService = async (borrowId: number, gameId: number) => {
  const body = {
    borrowId,
    gameId,
  };

  return await apiFetch("/borrows", {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export default returnBorrowService;
