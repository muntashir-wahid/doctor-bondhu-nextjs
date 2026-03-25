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

  if (token && PATHNAME.endsWith("member-login")) {
    return NextResponse.redirect(new URL("/clinic", request.url));
  }

  // Matches /clinic and /clinic/... but NOT /clinics or /clinics/...
  if (PATHNAME === "/clinic" || PATHNAME.startsWith("/clinic/")) {
    if (!token || !me?.clinicUid) {
      clearUserSession();
      return NextResponse.redirect(new URL("/clinics", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/clinics/:path*",
    "/adminum-login",
    "/clinic/:path*",
    "/patient/:path*",
    "/adminum/:path*",
  ],
};
