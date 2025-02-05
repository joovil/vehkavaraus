import { getAllGames } from "@/database/repositories/gameRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const res = await getAllGames();
  return Response.json(res);
};

// TODO: Secure route to admin only
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");

    if (!(file || name)) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Send image to blob

    // Add game to db
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return new NextResponse("asd");
  return Response.json({ message: "not implemented" }, { status: 404 });
};
