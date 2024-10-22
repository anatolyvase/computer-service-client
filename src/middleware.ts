import { NextRequest, NextResponse } from "next/server";

// tslint:disable-next-line
export async function middleware(req: NextRequest, _res: NextResponse) {
  const { url, cookies } = req;

  const refreshToken = cookies.get("refresh_token")?.value;

  if ((url.includes("/admin") || url.includes("/repairman")) && !refreshToken) {
    return NextResponse.error();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/settings/:path",
    "/basket/:path",
    "/orders/:path",
    "/admin/:path*",
    "/repairman/:path*",
  ],
};
