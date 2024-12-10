import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  // Main page doesn't currently have content so users are redirected to games page
  // if (req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/games", req.url));
  // }

  const token = await getToken({ req });

  if (!token && req.nextUrl.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const userIdMatch = req.nextUrl.pathname.match(/^\/user\/\d+$/);

  if (!token && userIdMatch) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return;

  console.log(req.nextUrl.pathname);

  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  // Subfolders of public need to be added here to be shown to users who have not logged in
  matcher: ["/((?!api|_next/static|_next/image|icons|favicon.ico|games).*)"],
};
