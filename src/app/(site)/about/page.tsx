import type { Metadata } from "next";
import Link from "next/link";
import { AtSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import TechBadge from "@/components/work/TechBadge";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/home/CTASection";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "Quvora's story, mission and the technologies we use to build modern, reliable software.",
  alternates: { canonical: "/about" },
};

const skills = {
  Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  Backend: ["Python", "Flask", "Node.js", "REST APIs", "Prisma"],
  Databases: ["PostgreSQL", "SQLite", "Supabase"],
  Tools: ["Git & GitHub", "Vercel", "Resend", "Figma-style UI design"],
};

export default function AboutPage() {
  return (
    <>
      <section className="section pb-6">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-300">About Quvora</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Software that's clean, modern and built to last</h1>
        <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-zinc-400">
          <p>
            Quvora started with a simple belief: good software shouldn't be complicated or out of reach for growing businesses. Hands-on projects, from QR-based attendance to transport management, taught us how to turn real-world problems into products people actually use.
          </p>
          <p>
            Today Quvora is a freelance software studio that designs and builds websites, web apps and integrations. We keep communication direct, deliver in clear milestones, and care about the details that make a product feel premium.
          </p>
        </div>
      </section>

      <section className="section pt-6">
        <Reveal>
          <Card className="bg-gradient-to-br from-violet-700/20 to-transparent">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-semibold">Our mission</h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-300">
                Helping businesses grow through clean, modern and reliable software.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <section className="section pt-6">
        <h2 className="font-display mb-8 text-2xl font-semibold">Skills &amp; technologies</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.06}>
              <Card className="h-full">
                <CardContent>
                  <h3 className="text-sm font-semibold text-zinc-200">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary" })}>
            <AtSign size={16} /> Follow @quvoradev
          </a>
          <Link href="/contact" className={buttonVariants()}>Work With Us</Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}
