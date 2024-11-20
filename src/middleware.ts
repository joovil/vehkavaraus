import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }
  console.log(1);
};

export const config = {
  matcher: "/",
};
