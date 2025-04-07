import {
  getVerificationByKey,
  updateVerificationStatusAndRole,
} from "@/database/repositories/verificationRepository";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ id: string }> },
) => {
  try {
    const params = await props.params;
    const verification = await getVerificationByKey(params.id);

    if (verification.used) {
      return Response.json({ error: "Key expired" }, { status: 400 });
    }

    await updateVerificationStatusAndRole(verification.verificationKey);

    return Response.json({ message: "User verified" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
};
