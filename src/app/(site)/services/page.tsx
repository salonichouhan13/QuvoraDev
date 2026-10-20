import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description: "Website development, web apps, UI/UX design, API integration, maintenance and SEO, offered by Quvora.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section pb-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-300">Services</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Everything you need to launch and grow online</h1>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">Six focused services, delivered with clean code, thoughtful design and clear communication.</p>
      </section>

      <section className="section grid gap-6 pt-8 lg:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 2) * 0.07}>
            <Card id={s.slug} className="flex h-full flex-col p-7">
              <div className="mb-4 inline-flex w-fit rounded-xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 p-3 text-violet-200">
                <s.icon size={24} />
              </div>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.description}</p>

              <h3 className="mt-6 text-sm font-semibold text-zinc-200">What's included</h3>
              <ul className="mt-3 space-y-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-zinc-300">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-zinc-200">Ideal for</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{s.ideal}</p>

              <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className={buttonVariants({ className: "mt-7 w-full sm:w-fit" })}>
                Start a Project
              </Link>
            </Card>
          </Reveal>
        ))}
      </section>
      <CTASection />
    </>
  );
}
