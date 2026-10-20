import { prisma } from "@/lib/prisma";
import { LEAD_STATUSES, STATUS_STYLES } from "@/lib/constants";
import LeadsTable from "@/components/admin/LeadsTable";
import { cn } from "@/lib/utils";

export const metadata = { title: "Leads | Admin" };

export default async function AdminDashboard() {
  const grouped = await prisma.lead.groupBy({ by: ["status"], _count: { _all: true } });
  const counts = Object.fromEntries(grouped.map((g) => [g.status, g._count._all]));
  const total = grouped.reduce((sum, g) => sum + g._count._all, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="mt-1 text-sm text-zinc-400">Project inquiries submitted through the website.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-zinc-400">Total</p>
          <p className="mt-1 text-2xl font-semibold">{total}</p>
        </div>
        {LEAD_STATUSES.map((s) => (
          <div key={s} className={cn("rounded-2xl border p-4", STATUS_STYLES[s])}>
            <p className="text-xs opacity-80">{s.replace("_", " ")}</p>
            <p className="mt-1 text-2xl font-semibold">{counts[s] ?? 0}</p>
          </div>
        ))}
      </div>

      <LeadsTable />
    </div>
  );
}
