import { NextRequest, NextResponse } from "next/server";
import { isMobile } from "./lib/utils";

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  if (!request.nextUrl.pathname.includes("auth")) {
    const isMPath = request.nextUrl.pathname.startsWith("/m");
    if (isMobile(userAgent) && !isMPath) {
      const url = request.nextUrl.clone();
      // Prepend /m to current path
      if (url.pathname === "/") {
        url.pathname = "/m/fixtures";
        return NextResponse.redirect(url);
      }
      url.pathname = `/m${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - service-worker.js (service worker
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|service-worker.js).*)",
  ],
};
