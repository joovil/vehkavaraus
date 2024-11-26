import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  return;
  const token = await getToken({ req });
  console.log(req.nextUrl.pathname);

  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  // Subfolders of public need to be added here to be shown to users who have not logged in
  matcher: ["/((?!api|_next/static|_next/image|icons|favicon.ico|games).*)"],
};
