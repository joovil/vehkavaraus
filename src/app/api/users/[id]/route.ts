import { getPersonById } from "@/server/repositories/UserRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const res = await getPersonById(params.id);
  return Response.json(res);
};
