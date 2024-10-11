import { findGameById } from "@/server/services/games/findGameById";

export const GET = async (
  _req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const res = await findGameById(params.id);

    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json({ message }, { status: 400 });
  }
};
