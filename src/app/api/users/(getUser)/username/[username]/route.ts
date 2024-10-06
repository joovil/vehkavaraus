import { getUserByName } from "@/server/repositories/userRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { username: string } }
) => {
  const res = await getUserByName(params.username);
  return Response.json(res);
};
