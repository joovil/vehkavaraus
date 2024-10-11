import { findUserByName } from "@/server/services/users/findUserByName";

export const GET = async (
  _req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const res = await findUserByName(params.username);
    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json({ message }, { status: 404 });
  }
};
