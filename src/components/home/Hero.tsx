import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { value: "6", label: "Core services" },
  { value: "3", label: "Projects built" },
  { value: "1:1", label: "Direct communication" },
];

const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute left-1/2 top-[-12%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#7a4a2a]/30 blur-[130px]" aria-hidden />

      <div className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center md:pt-28">
        <div className="rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a57c]/30 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-300 sm:text-sm">
            <Sparkles size={14} className="text-[#c9a57c]" /> Freelance software studio · Websites, apps &amp; software
          </span>
        </div>

        <h1 className="rise font-display mt-8 text-4xl leading-[1.12] tracking-tight sm:text-5xl md:text-6xl" style={delay(0.08)}>
          We build websites, apps &amp; software that help <em className="gradient-text">businesses grow.</em>
        </h1>

        <p className="rise mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg" style={delay(0.16)}>
          Quvora creates modern, reliable and scalable digital products: from sharp business websites to custom web apps, designed to look premium and built to perform.
        </p>

        <div className="rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={delay(0.24)}>
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            Start a Project <ArrowRight size={18} />
          </Link>
          <Link href="/work" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            View Our Work
          </Link>
        </div>

        <ul className="rise mx-auto mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-[#c9a57c]/20 bg-white/[0.02] py-5" style={delay(0.32)}>
          {stats.map((s) => (
            <li key={s.label} className="px-3">
              <p className="font-display text-3xl text-[#c9a57c]">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-400 sm:text-sm">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
