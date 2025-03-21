import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
  ];
  const isPublicPath = publicPaths.includes(path);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && (path === "/auth/login" || path === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
