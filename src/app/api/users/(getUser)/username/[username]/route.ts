import { UserClient } from "@/types/types";
import { getUserByName } from "@/lib/database/repositories/userRepository";
import { NoResultError } from "kysely";

export const GET = async (
  _req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const user = await getUserByName(params.username);
    const { id, username: fetchedUser, apartment, role } = user;

    const res: UserClient = {
      id,
      username: fetchedUser,
      apartment,
      role,
    };

    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof NoResultError) {
      message = "User not found";
    }

    return Response.json({ message }, { status: 404 });
  }
};
