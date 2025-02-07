import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  createBorrow,
  getAllBorrows,
} from "@/database/repositories/borrowRepository";

export const GET = async () => {
  try {
    const res = await getAllBorrows();
    return Response.json(res);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(error.message, { status: 400 });
    }
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await auth();

    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { gameId } = await req.json();

    if (!gameId)
      return Response.json({ error: "Missing gameId" }, { status: 400 });

    const res = await createBorrow(session.user.id, gameId);

    return Response.json(res, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
