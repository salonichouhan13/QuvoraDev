import { z } from "zod";
import { LeadStatus } from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().trim().email().max(120),
  password: z.string().min(1).max(200),
});

export const leadStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

const dateParam = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .optional();

export const leadsQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  status: z.nativeEnum(LeadStatus).optional(),
  from: dateParam,
  to: dateParam,
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
