import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a57c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#130e0b] disabled:pointer-events-none disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary:
    "bg-[#ece4d3] text-[#1d1612] shadow-lg shadow-black/30 hover:bg-white hover:-translate-y-0.5",
  secondary: "border border-[#c9a57c]/40 bg-transparent text-[#ece4d3] hover:bg-white/5 hover:-translate-y-0.5",
  ghost: "text-zinc-300 hover:bg-white/5 hover:text-white",
};
const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** Use on <Link> / <a> to get button styling. */
export function buttonVariants({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
  )
);
Button.displayName = "Button";
