import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/work/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected projects by Quvora: a QR attendance system, an expense tracker and a college bus management platform.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="section pb-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-300">Selected Work</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Real projects, real problems solved</h1>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">Each project started with a practical problem and ended with a working product.</p>
      </section>
      <section className="section grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </section>
      <CTASection />
    </>
  );
}
