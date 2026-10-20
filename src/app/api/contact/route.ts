import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  // 2. Parse JSON safely
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  // 3. Honeypot: bots fill hidden fields. Pretend success, save nothing.
  if (typeof body === "object" && body !== null && (body as { website?: string }).website) {
    return NextResponse.json({ success: true });
  }

  // 4. Server-side validation
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }
  const { website: _hp, ...data } = parsed.data;

  // 5. Save lead
  try {
    await prisma.lead.create({ data });
  } catch (err) {
    console.error("[contact] DB error:", err);
    return NextResponse.json(
      { success: false, error: "Could not save your inquiry. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  // 6. Email is best-effort: the lead is already saved, so don't fail the request.
  try {
    await sendLeadNotification(parsed.data);
  } catch (err) {
    console.error("[contact] Email error:", err);
  }

  return NextResponse.json({ success: true, message: "Thanks! We'll get back to you soon." }, { status: 201 });
}
