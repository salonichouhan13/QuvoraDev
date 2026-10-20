"use client";

import { useState } from "react";
import { LEAD_STATUSES, STATUS_STYLES, type LeadStatusValue } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function StatusSelect({ id, value }: { id: string; value: LeadStatusValue }) {
  const [status, setStatus] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function change(next: LeadStatusValue) {
    const prev = status;
    setStatus(next); // optimistic
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setStatus(prev);
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <select
        aria-label="Lead status"
        value={status}
        disabled={saving}
        onChange={(e) => change(e.target.value as LeadStatusValue)}
        className={cn("rounded-full border px-3 py-1 text-xs font-medium outline-none disabled:opacity-60 [&>option]:bg-zinc-900 [&>option]:text-zinc-100", STATUS_STYLES[status])}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>{s.replace("_", " ")}</option>
        ))}
      </select>
      {error && <p role="alert" className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
