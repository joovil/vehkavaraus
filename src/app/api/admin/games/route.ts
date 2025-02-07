import { getAdminGames } from "@/database/repositories/adminRepository";
import {
  createGame,
  getGameByName,
} from "@/database/repositories/gameRepository";
import { put } from "@vercel/blob";

export const GET = async () => {
  const games = await getAdminGames();

  return Response.json(games);
};

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    if (!(file || name)) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if game is already added
    const gameInDb = await getGameByName(name);

    if (gameInDb && gameInDb.name.toLowerCase() !== name) {
      return Response.json({ error: "Game already added" }, { status: 400 });
    }

    // Send image to blob
    const blob = await put(name, file, {
      access: "public",
    });

    // Add game to db
    const createdGame = await createGame(name, blob.url);

    return Response.json(createdGame);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return Response.json({ message: "not implemented" }, { status: 404 });
};
