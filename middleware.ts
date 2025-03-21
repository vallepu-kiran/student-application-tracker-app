// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/signup", "/auth/forgot-password"];
  const isPublicPath = publicPaths.includes(path);
  
  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to login if trying to access a protected route without being authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  
  if (token && (path === "/auth/login" || path === "/auth/signup")) {
    // Redirect to dashboard if already authenticated and trying to access login/signup
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except for API routes, static files, etc.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};