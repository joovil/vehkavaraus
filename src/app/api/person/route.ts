import { getAllPersons } from "@/server/repositories/PersonRepository";

export const GET = async () => {
  const res = await getAllPersons();
  return Response.json(res);
};
