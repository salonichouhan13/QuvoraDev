import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TechBadge from "./TechBadge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className={cn("relative flex h-40 items-end bg-gradient-to-br p-5", project.gradient)}>
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <Badge className="relative border-white/20 bg-black/30 backdrop-blur">{project.type}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-violet-300">{project.category}</p>
        <h3 className="font-display mt-2 text-xl font-semibold leading-snug">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.short}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
          {project.stack.length > 4 && <TechBadge>+{project.stack.length - 4}</TechBadge>}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-violet-300"
        >
          View case study <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Card>
  );
}
