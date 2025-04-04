import { deleteGame } from "@/database/repositories/gameRepository";

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  try {
    const gameId = parseInt(id);
    const deletedGame = await deleteGame(gameId);
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
