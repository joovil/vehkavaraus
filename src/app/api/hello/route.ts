import { gamesForAdminPanel } from "@/database/repositories/gameRepository";

export const GET = async () => {
  const res = await gamesForAdminPanel();
  console.log(res);

  return Response.json({ hello: "hello" });
};
