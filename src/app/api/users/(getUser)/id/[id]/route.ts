import { getUserById } from "@/server/repositories/userRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params);
  const res = await getUserById(params.id);
  return Response.json(res);
};
