import apiFetch from "@/lib/utils/apiFetch";

const returnBorrowService = async (borrowId: number) => {
  return await apiFetch(`/borrows/return/${borrowId}`, {
    method: "POST",
  });
};

export default returnBorrowService;
