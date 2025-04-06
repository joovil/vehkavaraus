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
      return Response.json({ error: error.message });
    }
  }
};
