import { getPersonById } from "@/server/Routes/PersonRoutes"

export const GET = async (
  _req: Request,
  { params }: { params: { id: string }}
) => {
  const res = await getPersonById(params.id)
  return Response.json(res)
}