import apiFetch from "@/lib/utils/apiFetch";
import { Borrow, BorrowSchema, NewBorrow } from "@/types";

export const createBorrowService = async (
  newBorrow: NewBorrow
): Promise<Borrow> => {
  const res = await apiFetch("/borrows", {
    method: "POST",
    body: JSON.stringify(newBorrow),
  });

  const data = await res.json();
  const borrow = BorrowSchema.parse(data);

  return borrow;
};
