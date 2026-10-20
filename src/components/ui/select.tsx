import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldClass } from "./input";

// Native <select>: best accessibility + mobile UX, styled to match the theme.
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldClass, "appearance-none bg-zinc-900/60 [&>option]:bg-zinc-900", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";
