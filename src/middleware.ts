import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // route protection
    const isAuth = await getToken({
      req,
      raw: true,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const sensitiveRoutes = ["/edit"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if(req.nextUrl.pathname.startsWith("/api")) {
      const response = NextResponse.next();
      response.headers.append("Access-Control-Allow-Origin", "*");
      return response;
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
)

export const config = {
  matcher: ["/login", "/edit", "/api"],
}