import { auth } from "../../app/api/auth/[...nextauth]/auth";

export const resendVerificationService = async () => {
  const session = await auth();
  console.log(session?.user.id);
};
