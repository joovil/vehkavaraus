import { getAllUsers } from "@/server/database/repositories/userRepository";

export const GET = async () => {
  const res = await getAllUsers();
  return Response.json(res);
};
