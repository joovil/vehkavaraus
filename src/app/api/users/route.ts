import { getAllUsers } from "@/server/repositories/UserRepository";

export const GET = async () => {
  const res = await getAllUsers();
  return Response.json(res);
};
