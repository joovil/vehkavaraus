import gameRepository from "@/database/repositories/gameRepository";

export const GET = async () => {
  const res = await gameRepository.gamesForAdminPanel();
  console.log(res);

  return Response.json({ hello: "hello" });
};
