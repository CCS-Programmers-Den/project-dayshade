import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isRecruitmentOpen } from "@/lib/actions/settings/recruitment-status";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/join") {
    const data = await isRecruitmentOpen();
    if (!data.is_recruitment_open) {
      return NextResponse.rewrite(new URL("/recruitmentclose", request.url));
    }
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
