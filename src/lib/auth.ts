import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase";

export function isAdminEmail(email?: string | null) {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return !!admin && !!email && email.trim().toLowerCase() === admin;
}

/** Returns the user only if logged in AND is the admin. Uses getUser() (verifies JWT with Supabase), never getSession(). */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return isAdminEmail(data.user?.email) ? data.user : null;
}

/** For Server Components / layouts. */
export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** For Route Handlers: `const denied = await guardAdminApi(); if (denied) return denied;` */
export async function guardAdminApi() {
  const user = await getAdminUser();
  if (user) return null;
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}
