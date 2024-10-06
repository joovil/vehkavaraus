import { createUser } from "@/server/routes/createNewUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password, apartment } = await req.json();

  try {
    const newUser = await createUser(username, password, apartment);
    return NextResponse.json({ newUser });
  } catch (error) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 400 });
  }
};
