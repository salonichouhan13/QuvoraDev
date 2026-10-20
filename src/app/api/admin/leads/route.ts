import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { guardAdminApi } from "@/lib/auth";
import { leadsQuerySchema } from "@/lib/admin-validation";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const denied = await guardAdminApi();
  if (denied) return denied;

  const params = Object.fromEntries(new URL(req.url).searchParams);
  const parsed = leadsQuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid query.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }
  const { q, status, from, to, page, pageSize } = parsed.data;

  const where: Prisma.LeadWhereInput = {
    ...(status && { status }),
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
      ],
    }),
    ...((from || to) && {
      createdAt: {
        ...(from && { gte: new Date(`${from}T00:00:00.000Z`) }),
        ...(to && { lte: new Date(`${to}T23:59:59.999Z`) }),
      },
    }),
  };

  try {
    const [total, leads] = await prisma.$transaction([
      prisma.lead.count({ where }),
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return NextResponse.json({
      success: true,
      leads,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("[admin/leads] GET error:", err);
    return NextResponse.json({ success: false, error: "Failed to load leads." }, { status: 500 });
  }
}
