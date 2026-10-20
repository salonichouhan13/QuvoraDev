import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";

export default function ServicesPreview() {
  return (
    <section className="section">
      <SectionHeading eyebrow="What we do" title="Services built around your growth" subtitle="End-to-end digital work, from the first design to launch and beyond." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.06}>
            <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <CardContent>
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 p-3 text-violet-200">
                  <s.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.short}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/services" className={buttonVariants({ variant: "secondary" })}>
          Explore all services <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
