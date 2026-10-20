import { ExternalLink, GitBranch } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

/** Never renders a broken link: missing URLs become a "Coming Soon" label. */
export default function ProjectLinks({ project }: { project: Project }) {
  const { github, live } = project;

  if (!github && !live) {
    return <Badge className="border-violet-400/30 bg-violet-500/10 text-violet-200">Case Study Coming Soon</Badge>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          <GitBranch size={16} /> View on GitHub
        </a>
      ) : (
        <Badge>GitHub Coming Soon</Badge>
      )}
      {live ? (
        <a href={live} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "sm" })}>
          <ExternalLink size={16} /> Live Demo
        </a>
      ) : (
        <Badge>Live Demo Coming Soon</Badge>
      )}
    </div>
  );
}
