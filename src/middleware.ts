// Next.js 16+ renamed this file convention to `proxy.ts` (export `proxy`). Rename if your version warns.
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Also refreshes the session cookie if the token is about to expire.
  const { data } = await supabase.auth.getUser();
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin = !!admin && data.user?.email?.toLowerCase() === admin;

  if (!isAdmin) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return response;
}

// NOTE: middleware is only the first gate. Layouts and every API handler re-check auth (defense in depth).
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
