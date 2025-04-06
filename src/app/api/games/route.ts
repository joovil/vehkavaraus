import { getAllGames } from "@/database/repositories/gameRepository";

export const GET = async () => {
  try {
    const res = await getAllGames();
    return Response.json(res);
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ error: error.message }, { status: 400 });
  }
};
