import { getBorrowById } from "@/database/repositories/borrowRepository";
import { returnGame } from "@/database/repositories/gameRepository";
import { auth } from "@/lib/utils/auth";

// TODO: Handle games returned late
export const POST = async (
  _req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const session = await auth();

    if (!session)
      return Response.json({ error: "Not authenticated" }, { status: 401 });

    const borrow = await getBorrowById(params.id);

    if (borrow.borrowerId !== session.user.id)
      return Response.json(
        { error: "You are not authorized to return this game" },
        { status: 403 }
      );

    await returnGame(params.id);

    return Response.json({ message: "Game returned" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
