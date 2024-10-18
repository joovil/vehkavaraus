import apiFetch from "@/lib/utils/apiFetch";
import { NewBorrow } from "@/types/types";

export const createBorrowService = async (newBorrow: NewBorrow) => {
  const res = await apiFetch("/borrows", {
    method: "POST",
    body: JSON.stringify(newBorrow),
  });
  return res;
};
