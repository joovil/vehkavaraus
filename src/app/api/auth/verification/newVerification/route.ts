import { newUserVerification } from "@/lib/auth/newUserVerification";
import { deleteVerificationByUserId } from "@/lib/database/repositories/verificationRepository";
import { User } from "@/types/user";

export const POST = async (user: User) => {
  try {
    await deleteVerificationByUserId(user.id);
    await newUserVerification(user);

    return Response.json({ message: "New verification email sent" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error }, { status: 400 });
    }
  }
};
