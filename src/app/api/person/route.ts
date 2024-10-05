import { getAllPersons } from "@/server/Routes/PersonRoutes";

export const GET = async () => {
  const res = await getAllPersons();
  return Response.json(res);
};
