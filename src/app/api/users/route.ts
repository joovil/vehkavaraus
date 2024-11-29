import { updateUser } from "@/database/repositories/userRepository";
import { auth } from "@/lib/utils/auth";
import { UserClientSchema, UserUpdate } from "@/types/user";
import bcryptjs from "bcryptjs";
import { ZodError } from "zod";

export const PUT = async (req: Request) => {
  try {
    const session = await auth();
    if (!session)
      return Response.json({ error: "Not authenticated" }, { status: 401 });

    const user = session.user;

    const { password, apartment } = await req.json();

    let password_hash;
    if (password) {
      password_hash = await bcryptjs.hash(password, 10);
    }

    const userUpdate: UserUpdate = {
      password_hash,
      apartment,
    };

    const updatedUser = await updateUser(user.id, userUpdate);
    const ret = UserClientSchema.parse(updatedUser);

    return Response.json(ret);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
