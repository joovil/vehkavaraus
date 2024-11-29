"use server";

import { UserUpdate } from "@/types/user";
import bcryptjs from "bcryptjs";

const updatePasswordAction = async (newPassword: string) => {
  try {
    const password_hash = await bcryptjs.hash(newPassword, 10);

    const userUpdate: UserUpdate = {
      password_hash: password_hash,
    };

    // await gameRepository.updateUser(userUpdate);
  } catch (error) {
    if (error instanceof Error) {
    }
  }
};

export default updatePasswordAction;
