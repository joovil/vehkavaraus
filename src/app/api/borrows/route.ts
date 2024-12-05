import borrowRepository from "@/database/repositories/borrowRepository";
import { createBorrow } from "@/lib/actions/borrows/createBorrow";
import { NewBorrowSchema } from "@/types";

export const GET = async () => {
  try {
    const res = await borrowRepository.getAllBorrows();
    return Response.json(res);
  } catch (error) {
    console.log(error);
    const message = "Unknown error";

    if (error instanceof Error) {
      return Response.json({ message }, { status: 404 });
    }

    return Response.json({ message }, { status: 404 });
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const borrow = NewBorrowSchema.parse(body);
    const res = await createBorrow(borrow);

    return Response.json(res);
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
};
