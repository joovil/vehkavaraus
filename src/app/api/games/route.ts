import gameRepository from "@/database/repositories/gameRepository";
import { NewGame } from "@/types/game";

export const GET = async () => {
  const res = await gameRepository.getAllGames();
  return Response.json(res);
};

export const POST = async (req: Request) => {
  const body = await req.json();

  const newGame: NewGame = {
    name: body.name,
    image: body.image,
  };

  const res = await gameRepository.createGame(newGame);
  return Response.json(res);
};
