import type { Lead } from "@prisma/client";
import type { LeadStatusValue } from "@/lib/constants";

// Re-export Prisma's generated types so DB schema and TS types never drift apart.
export type { Lead, LeadStatus } from "@prisma/client";
export type { ContactInput } from "@/lib/validation";

/** Lead as received by the browser (dates are ISO strings after JSON). */
export type LeadDTO = Omit<Lead, "createdAt" | "updatedAt" | "status"> & {
  status: LeadStatusValue;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  type: string;
  short: string;
  features: string[];
  stack: string[];
  caseStudy: string;
  github?: string;
  live?: string;
  gradient: string;
};
