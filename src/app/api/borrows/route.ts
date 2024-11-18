import {
  createBorrow,
  getAllBorrows,
} from "@/lib/database/repositories/borrowRepository";
import { NewBorrow } from "@/types/borrow";

export const GET = async () => {
  try {
    const res = await getAllBorrows();
    return Response.json(res);
  } catch (error) {
    const message = "Unknown error";

    if (error instanceof Error) {
      return Response.json({ message }, { status: 404 });
    }

    return Response.json({ message }, { status: 404 });
  }
};

export const POST = async (req: Request) => {
  const borrowToCreate: NewBorrow = await req.json();

  try {
    const createdBorrow = await createBorrow(borrowToCreate);
    return Response.json(createdBorrow);
  } catch (error) {
    return Response.json(error);
  }
};
