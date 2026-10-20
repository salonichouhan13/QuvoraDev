"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LeadDTO } from "@/types";
import { formatDate } from "@/lib/utils";
import LeadFilters, { type Filters } from "./LeadFilters";
import StatusSelect from "./StatusSelect";
import DeleteLeadButton from "./DeleteLeadButton";

const PAGE_SIZE = 15;
type Result = { leads: LeadDTO[]; total: number; totalPages: number };

export default function LeadsTable() {
  const [filters, setFilters] = useState<Filters>({ q: "", status: "", from: "", to: "" });
  const [q, setQ] = useState(""); // debounced search term
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<Result>({ leads: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQ(filters.q), 350);
    return () => clearTimeout(t);
  }, [filters.q]);

  useEffect(() => {
    const ctrl = new AbortController();
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    if (q) params.set("q", q);
    if (filters.status) params.set("status", filters.status);
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);

    setLoading(true);
    setError("");
    fetch(`/api/admin/leads?${params}`, { signal: ctrl.signal })
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load leads");
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message || "Failed to load leads");
        setLoading(false);
      });
    return () => ctrl.abort();
  }, [q, filters.status, filters.from, filters.to, page, reload]);

  const onFilters = (next: Filters) => {
    setFilters(next);
    setPage(1);
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400";
  const td = "px-4 py-3 align-top text-sm";

  return (
    <section className="space-y-4">
      <LeadFilters filters={filters} onChange={onFilters} />

      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[820px]">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className={th}>Lead</th>
              <th className={th}>Service / Budget</th>
              <th className={th}>Status</th>
              <th className={th}>Received</th>
              <th className={th}><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-500">Loading leads...</td></tr>
            )}
            {!loading && data.leads.length === 0 && !error && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-500">No leads found.</td></tr>
            )}
            {!loading &&
              data.leads.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02]">
                  <td className={td}>
                    <Link href={`/admin/leads/${l.id}`} className="font-medium text-white hover:text-violet-300">{l.name}</Link>
                    <p className="text-xs text-zinc-400">{l.email}</p>
                    <p className="text-xs text-zinc-500">{l.phone}</p>
                  </td>
                  <td className={td}>
                    <p>{l.service}</p>
                    <p className="text-xs text-zinc-500">{l.budget}</p>
                  </td>
                  <td className={td}><StatusSelect key={`${l.id}-${l.status}`} id={l.id} value={l.status} /></td>
                  <td className={`${td} whitespace-nowrap text-zinc-400`}>{formatDate(l.createdAt)}</td>
                  <td className={td}>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/leads/${l.id}`} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs hover:bg-white/5">View</Link>
                      <DeleteLeadButton id={l.id} onDeleted={() => setReload((n) => n + 1)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>{data.total} lead{data.total === 1 ? "" : "s"}</span>
        <div className="flex items-center gap-3">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/5 disabled:opacity-40">Previous</button>
          <span>Page {page} of {Math.max(data.totalPages, 1)}</span>
          <button disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/5 disabled:opacity-40">Next</button>
        </div>
      </div>
    </section>
  );
}
