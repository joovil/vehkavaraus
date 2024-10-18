import { getAllUsers } from "@/lib/database/repositories/userRepository";

export const GET = async () => {
  const res = await getAllUsers();
  return Response.json(res);
};
