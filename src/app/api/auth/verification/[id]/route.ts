import {
  getVerificationByKey,
  updateVerificationStatusAndRole,
} from "@/database/repositories/verificationRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const verification = await getVerificationByKey(params.id);

  if (verification.used) {
    return Response.json({ message: "Link expired" }, { status: 400 });
  }

  updateVerificationStatusAndRole(params.id);
  return Response.json({ message: "Email verified" });
};
