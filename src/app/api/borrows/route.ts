import borrowRepository from "@/database/repositories/borrowRepository";
import gameRepository from "@/database/repositories/gameRepository";
import { getUserById } from "@/database/repositories/userRepository";
import { createBorrow } from "@/lib/actions/createBorrow";
import { auth } from "@/lib/utils/auth";
import { NewBorrowSchema } from "@/types/borrow";

export const GET = async () => {
  try {
    const res = await borrowRepository.getAllBorrows();
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
  try {
    const body = await req.json();

    const borrow = NewBorrowSchema.parse(body);
    const res = await createBorrow(borrow);

    return Response.json(res);
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = await auth();
    const { borrowId, gameId } = await req.json();

    if (!session) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!borrowId || !gameId) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const borrow = await borrowRepository.getBorrowById(borrowId);
    console.log(borrow);
    const user = await getUserById(borrow.borrower);
    console.log(user);

    if (borrow.borrower !== session.user.id && user.id !== session.user.id) {
      return Response.json(
        { error: "Borrower and returned do not match" },
        { status: 401 }
      );
    }
    const res = await gameRepository.returnGame(borrowId, gameId);

    return Response.json(res);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
