import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  // Main page doesn't currently have content so users are redirected to games page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/games", req.url));
  }

  const token = await getToken({ req });

  // Direct non logged users to login page if trying to access user page
  if (!token && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Direct logged users to /games
  if (
    token &&
    (pathname.startsWith("/signup") || pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/games", req.url));
  }

  // Don't allow users to navigate to other users page
  if (
    token &&
    pathname.match("/user") &&
    !pathname.endsWith(token.user.username)
  ) {
    return NextResponse.redirect(new URL(`${token.user.username}`, req.url));
  }

  // Protect admin pages
  if (token && pathname.startsWith("/admin") && token.user.role !== "admin") {
    return NextResponse.redirect(new URL("/games", req.url));
  }
};

export const config = {
  // Subfolders of public need to be added here to be shown to users who have not logged in
  matcher: ["/((?!api|_next/static|_next/image|icons|favicon.ico|games).*)"],
};
