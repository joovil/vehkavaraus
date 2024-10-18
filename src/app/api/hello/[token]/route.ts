import { decodeToken } from "@/lib/auth/decodeToken";
import { Roles } from "@/lib/types";
import {
  getUserById,
  updateUserRole,
} from "@/server/database/repositories/userRepository";
import { NoResultError } from "kysely";
import { DatabaseError } from "pg";

export const GET = async (
  _req: Request,
  { params }: { params: { token: string } }
) => {
  try {
    const decodedToken = decodeToken(params.token);

    const user = await getUserById(decodedToken.id);
    const ret = await updateUserRole(user.id, Roles.user);
    return Response.json(ret);
  } catch (error) {
    if (error instanceof NoResultError) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }

    if (error instanceof DatabaseError) {
      if (error.code == "22P02")
        return Response.json({ error: "User not found" }, { status: 400 });
    }

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
