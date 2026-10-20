import { cn } from "@/lib/utils";

// CSS-only scroll reveal (see .reveal in globals.css). No JavaScript needed, content never stays hidden.
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
