import { UserCredentials } from "@/types";
import { userLogin } from "../../../../server/services/userLogin";

export const POST = async (req: Request) => {
  const credentials: UserCredentials = await req.json();

  try {
    const token = await userLogin(credentials);
    return Response.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    return Response.json({ error: "Unhandled error" }, { status: 400 });
  }
};
