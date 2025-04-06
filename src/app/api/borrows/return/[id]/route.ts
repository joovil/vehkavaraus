import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { getBorrowById } from "@/database/repositories/borrowRepository";
import { completeBorrow } from "@/database/repositories/gameRepository";
import logger from "@/lib/utils/logger";

export const POST = async (
  _req: Request,
  props: { params: Promise<{ id: number }> },
) => {
  const params = await props.params;
  logger.logGreen(params.id as unknown as string);
  try {
    const session = await auth();

    if (!session)
      return Response.json({ error: "Not authenticated" }, { status: 401 });

    const borrow = await getBorrowById(params.id);

    if (borrow.borrowerId !== session.user.id && session.user.role !== "admin")
      return Response.json(
        { error: "You are not authorized to return this game" },
        { status: 403 },
      );

    await completeBorrow(params.id);

    return Response.json({ message: "Game returned" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
