import {
  getVerificationByKey,
  updateVerificationStatusAndRole,
} from "@/database/repositories/verificationRepository";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ id: string }> },
) => {
  const params = await props.params;
  const verification = await getVerificationByKey(params.id);

  if (verification.used) {
    return Response.json({ message: "Link expired" }, { status: 400 });
  }

  updateVerificationStatusAndRole(params.id);

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${process.env.NEXTAUTH_URL}/signup/verification`,
    },
  });
};
