import verificationRepository from "@/database/repositories/verificationRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const verification = await verificationRepository.getVerificationByKey(
    params.id
  );

  if (verification.used) {
    return Response.json({ message: "Link expired" }, { status: 400 });
  }

  verificationRepository.updateVerificationStatusAndRole(params.id);
  return Response.json({ message: "Email verified" });
};
