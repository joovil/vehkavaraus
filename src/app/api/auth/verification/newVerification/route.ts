import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { getUserById } from "@/database/repositories/userRepository";
import { deleteVerificationByUserId } from "@/database/repositories/verificationRepository";
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail";

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
