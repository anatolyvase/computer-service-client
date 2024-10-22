import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { url, cookies } = req;

  const accessToken = cookies.get("access_token")?.value;

  if ((url.includes("/admin") || url.includes("/repairman")) && !accessToken) {
    return NextResponse.error();
  }

  // if (!accessToken) {
  //   return NextResponse.redirect(new URL("/", url));
  // }

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
