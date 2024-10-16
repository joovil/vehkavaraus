import { UserClient } from "@/lib/types";
import { getUserById } from "@/server/database/repositories/userRepository";
import { NoResultError } from "kysely";
import { DatabaseError } from "pg";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserById(params.id);
    const { id: userId, username, apartment, role } = user;

    const res: UserClient = {
      id: userId,
      username,
      apartment,
      role,
    };

    return Response.json(res);
  } catch (error) {
    let message = "Unknown error";
    let status = 404;

    if (error instanceof NoResultError) {
      message = "User not found";
    }

    if (error instanceof DatabaseError) {
      if (error.code == "22P02") {
        message = "Invalid id";
        status = 400;
      }
    }

    return Response.json({ message }, { status });
  }
};
