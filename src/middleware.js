// import { verifySession } from "@/lib/auth";

export async function middleware(request) {
  //   return await verifySession(request);
  console.log("yoyoyo");
}

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|.*\\.png$|login|signup|forgot-password).*)",
//   ],
// };
export const config = {
  matcher: ["/(.*)"],
};
