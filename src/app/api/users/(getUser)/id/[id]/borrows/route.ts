import { getBorrowById } from "@/server/database/repositories/borrowRepository";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "@/lib/envVariables";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const token = cookies().get("token");

    if (!token) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const decodedToken = jwt.verify(token.value, TOKEN_SECRET);
    console.log(decodedToken);

    const res = await getBorrowById(params.id);
    return Response.json(res);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "unknown error" }, { status: 400 });
  }
};
