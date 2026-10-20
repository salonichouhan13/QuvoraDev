import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/auth";
import { loginSchema } from "@/lib/admin-validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Brute-force protection: 5 attempts / 10 min per IP (best-effort, see rate-limit.ts note).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(`login:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid email or password." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  // Same message for wrong password and non-admin account (no user enumeration).
  if (error || !isAdminEmail(data.user?.email)) {
    if (!error) await supabase.auth.signOut();
    return NextResponse.json({ success: false, error: "Invalid email or password." }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
