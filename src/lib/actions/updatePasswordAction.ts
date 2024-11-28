"use server";

import { updateUser } from "@/database/repositories/userRepository";
import { UserUpdate } from "@/types/user";
import bcryptjs from "bcryptjs";

const updatePasswordAction = async (newPassword: string) => {
  c;

  try {
    const password_hash = await bcryptjs.hash(newPassword, 10);

    const userUpdate: UserUpdate = {
      password_hash: password_hash,
    };

    await updateUser(userUpdate);
  } catch (error) {
    if (error instanceof Error) {
    }
  }
};

export default updatePasswordAction;
