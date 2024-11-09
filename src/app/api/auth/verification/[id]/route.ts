import { updateVerificationStatusAndRole } from "@/lib/database/repositories/verificationRepository";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  updateVerificationStatusAndRole(params.id);

  console.log(params);
  // TODO: finish implementation
  return Response.json({ hello: "testing" });
};
