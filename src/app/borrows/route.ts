import { NewBorrow } from "@/lib/types";
import {
  createBorrow,
  getAllBorrows,
} from "@/server/database/repositories/borrowRepository";

export const GET = async (_req: Request) => {
  try {
    const res = await getAllBorrows();
    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";

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
