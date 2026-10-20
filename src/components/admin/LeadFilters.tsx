"use client";

import { Search } from "lucide-react";
import { LEAD_STATUSES } from "@/lib/constants";

export type Filters = { q: string; status: string; from: string; to: string };

const field =
  "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-400 [&>option]:bg-zinc-900";

export default function LeadFilters({ filters, onChange }: { filters: Filters; onChange: (next: Filters) => void }) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="relative min-w-56 flex-1">
        <span className="sr-only">Search leads</span>
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="search"
          value={filters.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Search name, email or phone"
          className={`${field} w-full pl-9`}
        />
      </label>
      <label className="text-xs text-zinc-400">
        Status
        <select value={filters.status} onChange={(e) => set({ status: e.target.value })} className={`${field} mt-1 block`}>
          <option value="">All</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
      </label>
      <label className="text-xs text-zinc-400">
        From
        <input type="date" value={filters.from} max={filters.to || undefined} onChange={(e) => set({ from: e.target.value })} className={`${field} mt-1 block`} />
      </label>
      <label className="text-xs text-zinc-400">
        To
        <input type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => set({ to: e.target.value })} className={`${field} mt-1 block`} />
      </label>
      <button onClick={() => onChange({ q: "", status: "", from: "", to: "" })} className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:text-white">
        Reset
      </button>
    </div>
  );
}
