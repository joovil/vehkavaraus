import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  deleteGame,
  getGameById,
} from "@/database/repositories/gameRepository";
import { del } from "@vercel/blob";

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  console.log(id);
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin")
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const gameId = parseInt(id);
    const gameToDelete = await getGameById(gameId);
    const deletedGame = await deleteGame(gameId);

    await del(`${gameToDelete.imageUrl}`);
    if (deletedGame.numDeletedRows > 0) {
      return Response.json({ message: "Game deleted successfully" });
    }
    return Response.json({ message: "Game already deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
