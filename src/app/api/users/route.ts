import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { updateUser } from "@/database/repositories/userRepository";
import { UserClientSchema, UserUpdate } from "@/types";
import bcryptjs from "bcryptjs";
import { ZodError } from "zod";

export const PUT = async (req: Request) => {
  try {
    const session = await auth();
    if (!session)
      return Response.json({ error: "Not authenticated" }, { status: 401 });

    const user = session.user;

    const data = await req.json();

    if (!data.password && !data.apartment)
      return Response.json({ error: "Fields missing" }, { status: 400 });

    const { password, apartment } = data;

    let password_hash;
    if (password) {
      password_hash = await bcryptjs.hash(password, 10);
    }

    const userUpdate: UserUpdate = {
      passwordHash: password_hash,
      apartment,
    };

    const updatedUser = await updateUser(user.id, userUpdate);
    const ret = UserClientSchema.parse(updatedUser);

    return Response.json(ret);
  } catch (error) {
    // console.log(error);
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    if (error instanceof Error) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }
  }
};
