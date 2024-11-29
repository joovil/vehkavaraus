import gameRepository from "@/database/repositories/gameRepository";
import { NoResultError } from "kysely";

export const GET = async (
  _req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const res = await gameRepository.getGameById(params.id);

    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";

    if (error instanceof NoResultError) {
      message = "Game not found";
    }

    return Response.json({ message }, { status: 400 });
  }
};
