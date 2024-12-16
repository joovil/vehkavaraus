import apiFetch from "@/lib/utils/apiFetch";

const completeBorrowService = async (borrowId: number) => {
  return await apiFetch(`/borrows/return/${borrowId}`, {
    method: "POST",
  });
};

export default completeBorrowService;
