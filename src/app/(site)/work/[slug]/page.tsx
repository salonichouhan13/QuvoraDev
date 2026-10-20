import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TechBadge from "@/components/work/TechBadge";
import ProjectLinks from "@/components/work/ProjectLinks";
import CTASection from "@/components/home/CTASection";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.short },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <article className="section">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> All work
        </Link>

        <header className="mt-6">
          <Badge>{project.type}</Badge>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-wider text-violet-300">{project.category}</p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">{project.short}</p>
          <div className="mt-6"><ProjectLinks project={project} /></div>
        </header>

        <div className={cn("relative mt-10 h-56 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br sm:h-72", project.gradient)} aria-hidden>
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="p-7 lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">Case study</h2>
            <p className="mt-3 leading-relaxed text-zinc-400">{project.caseStudy}</p>
            <h3 className="font-display mt-8 text-lg font-semibold">Key features</h3>
            <ul className="mt-4 space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-zinc-300">
                  <Check size={18} className="mt-0.5 shrink-0 text-emerald-400" /> {f}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="h-fit p-7">
            <h2 className="font-display text-xl font-semibold">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
            </div>
          </Card>
        </div>
      </article>
      <CTASection />
    </>
  );
}
