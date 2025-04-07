import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  console.log(pathname);
  // Main page doesn't currently have content so users are redirected to games page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/games", req.url));
  }

  const token = await getToken({ req });

  // Direct non logged users to login page if trying to access user page
  if (!token && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Direct logged user to /games
  if (
    token &&
    (pathname.startsWith("/signup") || pathname.startsWith("/login"))
  ) {
    if (
      token.user.role === "unverified" &&
      pathname.includes("/verification")
    ) {
      return;
    }
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

  // Protect admin pages and api
  if (process.env.NODE_ENV !== "development") {
    if (
      pathname.startsWith("/admin") &&
      (!token || token.user.role !== "admin")
    ) {
      return NextResponse.redirect(new URL("/games", req.url));
    }

    if (
      pathname.startsWith("/api") &&
      (!token || token.user.role !== "admin")
    ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|admin/:path|api/admin:path).*)",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
