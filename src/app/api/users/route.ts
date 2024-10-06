import { getAllUsers } from "@/server/repositories/userRepository";

export const GET = async () => {
  const res = await getAllUsers();
  return Response.json(res);
};
