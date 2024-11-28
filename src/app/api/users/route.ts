import { updateUser } from "@/database/repositories/userRepository";
import { auth } from "@/lib/utils/auth";
import { UserUpdateSchema } from "@/types/user";
import bcryptjs from "bcryptjs";

export const PUT = async (req: Request) => {
  const session = await auth();
  console.log(session);

  const data = await req.json();

  if (!data.id) {
    return Response.json({ error: "User id missing" }, { status: 400 });
  }

  let password_hash;
  if (data.password) {
    password_hash = await bcryptjs.hash(data.password, 10);
  }

  try {
    const userUpdate = UserUpdateSchema.parse({ ...data, password_hash });
    const updatedUser = await updateUser(data.id, userUpdate);
    return Response.json(updatedUser);
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ error: error.message }, { status: 400 });
  }
};
