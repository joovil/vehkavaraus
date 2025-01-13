import { auth } from "../utils/auth";

export const resendVerificationService = async () => {
  const session = await auth();
  console.log(session?.user.id);
};
