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

// Return game
// export const POST = async (
//   _req: Request,
//   props: { params: Promise<{ id: number }> },
// ) => {
//   try {
//     const { id } = await props.params;
//     await updateGameReturned(id);
//     return Response.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return Response.json({ error: error.message }, { status: 400 });
//     }
//   }
// };
