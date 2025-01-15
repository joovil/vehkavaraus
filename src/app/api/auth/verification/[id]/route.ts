import {
  getVerificationByKey,
  updateVerificationStatusAndRole,
} from "@/database/repositories/verificationRepository";
import { NEXTAUTH_URL } from "@/lib/utils/envVariables";

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
      Location: `${NEXTAUTH_URL}/signup/verification`,
    },
  });
};
