import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearUserSession, getUserSession } from "./lib/user-session";
import { fetchMe } from "./lib/actions/auth-actions";

export async function middleware(request: NextRequest) {
  const PATHNAME = request.nextUrl.pathname;

  const token = await getUserSession();
  const me = await fetchMe();

  if (!token) {
    if (PATHNAME.startsWith("/adminum") && !me?.isSuperAdmin) {
      if (PATHNAME === "/adminum-login") {
        return NextResponse.next();
      }

      clearUserSession();
      return NextResponse.redirect(new URL("/adminum-login", request.url));
    }
  }

  if (token && PATHNAME === "/adminum-login") {
    if (me?.isSuperAdmin) {
      return NextResponse.redirect(new URL("/adminum", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/clinics/:path*",
    "/adminum-login",
    "/clinics/:path*",
    "/patient/:path*",
    "/adminum/:path*",
  ],
};
