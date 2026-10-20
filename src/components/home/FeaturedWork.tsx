import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/work/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

export default function FeaturedWork() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Selected work" title="Projects we're proud of" subtitle="A look at the products we've designed and built." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/work" className={buttonVariants({ variant: "secondary" })}>
          See all work <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
