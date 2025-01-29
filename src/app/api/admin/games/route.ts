import { getAdminGames } from "@/database/repositories/adminRepository";

export const GET = async () => {
  const games = await getAdminGames();

  return Response.json(games);
};
