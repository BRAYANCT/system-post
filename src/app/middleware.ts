import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const path = req.nextUrl.pathname;

  if (path === "/") {
  return NextResponse.redirect(new URL("/dashboard/home", req.url));
}
  // Raíz → dashboard/home
  if (path === "/") return NextResponse.redirect(new URL("/dashboard/home", req.url));

  // Login dentro de dashboard
  if (token && path === "/auth/sign-in") {
    return NextResponse.redirect(new URL("/dashboard/home", req.url));
  }

  // Dashboard protegido
  if (!token && path.startsWith("/dashboard") && path !== "/auth/sign-in") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Cualquier otra ruta → dashboard/home
  if (!path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard/home", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
