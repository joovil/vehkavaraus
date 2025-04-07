import { getGameById } from "@/database/repositories/gameRepository";
import { NoResultError } from "kysely";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ id: number }> },
) => {
  const params = await props.params;
  try {
    const res = await getGameById(params.id);

    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";

    if (error instanceof NoResultError) {
      message = "Game not found";
    }

    return Response.json({ message }, { status: 400 });
  }
};
