"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteLeadButton({ id, onDeleted, redirectTo }: { id: string; onDeleted?: () => void; redirectTo?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this lead permanently? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDeleted?.();
      if (redirectTo) {
        router.replace(redirectTo);
        router.refresh();
      }
    } catch {
      window.alert("Could not delete the lead. Please try again.");
      setBusy(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      aria-label="Delete lead"
      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 px-2.5 py-1.5 text-xs text-rose-300 transition hover:bg-rose-500/10 disabled:opacity-60"
    >
      <Trash2 size={14} /> {busy ? "Deleting..." : "Delete"}
    </button>
  );
}
