import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, toWhatsAppNumber } from "@/lib/utils";
import type { LeadStatusValue } from "@/lib/constants";
import StatusSelect from "@/components/admin/StatusSelect";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";

type Props = { params: Promise<{ id: string }> };

export const metadata = { title: "Lead details | Admin" };

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const row = (label: string, value: React.ReactNode) => (
    <div className="grid gap-1 border-b border-white/5 py-4 sm:grid-cols-3">
      <dt className="text-sm text-zinc-400">{label}</dt>
      <dd className="text-sm sm:col-span-2">{value}</dd>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={16} /> All leads
      </Link>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{lead.name}</h1>
        <div className="flex items-center gap-3">
          <StatusSelect id={lead.id} value={lead.status as LeadStatusValue} />
          <DeleteLeadButton id={lead.id} redirectTo="/admin" />
        </div>
      </div>

      <dl className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-6">
        {row("Email", <a href={`mailto:${lead.email}`} className="text-violet-300 hover:underline">{lead.email}</a>)}
        {row("WhatsApp", lead.phone)}
        {row("Service", lead.service)}
        {row("Budget", lead.budget)}
        {row("Received", formatDate(lead.createdAt))}
        {row("Last updated", formatDate(lead.updatedAt))}
        {row("Project details", <p className="whitespace-pre-wrap leading-relaxed text-zinc-300">{lead.message}</p>)}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/${toWhatsAppNumber(lead.phone)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          <MessageCircle size={16} /> Reply on WhatsApp
        </a>
        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">
          <Mail size={16} /> Reply by email
        </a>
      </div>
    </div>
  );
}
