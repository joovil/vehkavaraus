import {
  createGame,
  getAllGames,
} from "@/database/repositories/gameRepository";
import { NewGame } from "@/types/game";

export const GET = async () => {
  const res = await getAllGames();
  return Response.json(res);
};

export const POST = async (req: Request) => {
  const body = await req.json();

  const newGame: NewGame = {
    name: body.name,
    image: body.image,
  };

  const res = await createGame(newGame);
  return Response.json(res);
};
