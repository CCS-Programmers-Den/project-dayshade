import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { isRecruitmentOpen } from "@/lib/data/setting-queries";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/join") {
    const data = await isRecruitmentOpen();
    if (!data.is_recruitment_open) {
      return NextResponse.rewrite(new URL("/recruitmentclose", request.url));
    }
  }
  if (request.nextUrl.pathname === "/leaderboard") {
      return NextResponse.rewrite(new URL("/404Page", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
