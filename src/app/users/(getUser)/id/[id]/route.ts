import { findUserById } from "@/server/services/findUserById";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const res = await findUserById(params.id);
    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json({ message }, { status: 400 });
  }
};
