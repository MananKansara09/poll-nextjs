import { NextRequest, NextResponse } from "next/server";

const BASE_URL = `http://localhost:3000`;

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthPath = request.url.includes("/auth/login") || request.url.includes("/auth/signup");
  const isMainPath = request.url.includes("/main");
  const isAccountPath = request.url.includes("/account");
  const isPollPath = request.url.includes("/poll");
  const isRootPath = request.nextUrl.pathname === "/";

  if (accessToken) {
    if (isRootPath || isAuthPath) {
      // User is authenticated but accessing root or auth path, redirect to /main
      return NextResponse.redirect(new URL("/main", BASE_URL));
    }
    // User is authenticated and accessing allowed paths
    return NextResponse.next();
  } else {
    if (!isAuthPath) {
      // User is not authenticated and not on an auth path, redirect to /auth/login
      const loginUrl = new URL("/auth/login", BASE_URL);
      return NextResponse.redirect(loginUrl);
    }
    // User is not authenticated but accessing an auth path
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/main/:path*",
    "/poll/:path*",
    "/account/:path*",
    "/",
  ],
};
