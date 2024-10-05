import { getPersonById } from "@/server/repositories/PersonRepository"

export const GET = async (
  _req: Request,
  { params }: { params: { id: string }}
) => {
  const res = await getPersonById(params.id)
  return Response.json(res)
}