import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

// Native <details>: accessible, keyboard friendly, zero JS.
export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="glass group rounded-2xl px-6 py-4 open:border-white/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown size={18} className="shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
