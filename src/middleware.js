import { NextResponse } from "next/server";

export async function middleware(request) {
  // For demo purposes, allow access to all pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internal routes
    "/((?!_next/static|_next/image|.*\\.png$).*)",
  ],
};
