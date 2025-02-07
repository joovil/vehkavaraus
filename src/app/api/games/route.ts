import { getAllGames } from "@/database/repositories/gameRepository";

export const GET = async () => {
  const res = await getAllGames();
  return Response.json(res);
};
