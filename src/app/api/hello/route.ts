import { createBorrowUpdateAvailability } from "@/lib/database/wrappers/createBorrowUpdateAvailability";
import { NewBorrow } from "@/types/borrow";

export const GET = async () => {
  const nb: NewBorrow = {
    borrower: "b2bb094c-03e2-4f40-ac52-e0eb21d4baed",
    game: 1,
  };
  const res = await createBorrowUpdateAvailability(nb);
  console.log(res);
  return Response.json({ hello: "hello" });
};
