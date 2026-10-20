import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { guardAdminApi } from "@/lib/auth";
import { leadStatusSchema } from "@/lib/admin-validation";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

const notFound = () => NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
const isNotFound = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await guardAdminApi();
  if (denied) return denied;
  const { id } = await params;

  const lead = await prisma.lead.findUnique({ where: { id } });
  return lead ? NextResponse.json({ success: true, lead }) : notFound();
}

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await guardAdminApi();
  if (denied) return denied;
  const { id } = await params;

  const parsed = leadStatusSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid status." }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.update({ where: { id }, data: { status: parsed.data.status } });
    return NextResponse.json({ success: true, lead });
  } catch (err) {
    if (isNotFound(err)) return notFound();
    console.error("[admin/leads] PATCH error:", err);
    return NextResponse.json({ success: false, error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await guardAdminApi();
  if (denied) return denied;
  const { id } = await params;

  try {
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (isNotFound(err)) return notFound();
    console.error("[admin/leads] DELETE error:", err);
    return NextResponse.json({ success: false, error: "Delete failed." }, { status: 500 });
  }
}
