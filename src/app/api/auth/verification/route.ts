import { getUserById } from "@/database/repositories/userRepository";
import { deleteVerificationByUserId } from "@/database/repositories/verificationRepository";
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail";
import { auth } from "../[...nextauth]/auth";

export const POST = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }
    const user = await getUserById(session.user.id);
    await deleteVerificationByUserId(user.id);
    sendVerificationEmail(user);

    return Response.json({ message: "New verification email sent" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error }, { status: 400 });
    }
  }
};
