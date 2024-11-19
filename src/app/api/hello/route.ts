import { createBorrow } from "@/lib/actions/createBorrow";
import { NewBorrow } from "@/types/borrow";

export const GET = async () => {
  const nb: NewBorrow = {
    borrower: "b2bb094c-03e2-4f40-ac52-e0eb21d4baed",
    game: 1,
  };
  const res = await createBorrow(nb);
  console.log(res);
  return Response.json({ hello: "hello" });
};
