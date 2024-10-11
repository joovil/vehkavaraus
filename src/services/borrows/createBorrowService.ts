import apiFetch from "@/lib/apiFetch";
import { NewBorrow } from "@/lib/types";

export const createBorrowService = async (newBorrow: NewBorrow) => {
  const res = await apiFetch("/borrows", {
    method: "POST",
    body: JSON.stringify(newBorrow),
  });
  return res;
};
