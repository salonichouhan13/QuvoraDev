"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#c9a57c]/15 bg-[#130e0b]/85 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a57c] text-xl text-[#1d1612]">Q</span>
          <span className="font-display text-2xl">Quvora<span className="gradient-text">.</span></span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-[#c9a57c]/20 bg-white/[0.03] p-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2 text-sm transition-colors",
                    active ? "bg-[#ece4d3] text-[#1d1612]" : "text-zinc-300 hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={buttonVariants({ size: "sm", className: "hidden sm:inline-flex" })}>
            Start a Project
          </Link>
          <button
            className="rounded-full p-2 text-zinc-300 hover:bg-white/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-[#c9a57c]/15 bg-[#130e0b] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn("block rounded-xl px-4 py-3 text-base", pathname === l.href ? "bg-[#ece4d3] text-[#1d1612]" : "text-zinc-300 hover:bg-white/5")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className={buttonVariants({ className: "mt-3 w-full" })}>
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
