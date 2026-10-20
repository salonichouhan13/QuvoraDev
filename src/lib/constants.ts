export const SITE = {
  name: "Quvora",
  tagline: "We build websites, apps & software that help businesses grow.",
  domain: "quvora.dev",
  email: "quvoradev12@gmail.com",
} as const;

export const SERVICES = [
  "Website Development",
  "Web App Development",
  "UI/UX Design",
  "API Development & Integration",
  "Website Maintenance & Support",
  "SEO & Performance Optimization",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "Under ₹15,000",
  "₹15,000 - ₹50,000",
  "₹50,000 - ₹1,50,000",
  "₹1,50,000+",
  "Not sure yet",
] as const;

// NEXT_PUBLIC_* values are inlined at build time, so they are safe to use in client components.
export const CONTACT = {
  whatsappPrimary: process.env.NEXT_PUBLIC_WHATSAPP_PRIMARY ?? "919098218202",
  whatsappSecondary: process.env.NEXT_PUBLIC_WHATSAPP_SECONDARY ?? "916261044962",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/quvoradev",
} as const;

export const whatsappLink = (number: string, text = "Hi Quvora, I'd like to discuss a project.") =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Defined here (not imported from @prisma/client) so client components never bundle Prisma.
export const LEAD_STATUSES = ["NEW", "CONTACTED", "IN_PROGRESS", "WON", "LOST"] as const;
export type LeadStatusValue = (typeof LEAD_STATUSES)[number];

export const STATUS_STYLES: Record<LeadStatusValue, string> = {
  NEW: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  CONTACTED: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  IN_PROGRESS: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  WON: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  LOST: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};
