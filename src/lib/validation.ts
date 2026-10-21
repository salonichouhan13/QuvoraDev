import { z } from "zod";
import { BUDGETS, SERVICES } from "./constants";


export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Enter a valid WhatsApp number"),
  service: z.enum(SERVICES, { message: "Select a service" }),
  budget: z.enum(BUDGETS, { message: "Select a budget" }),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
  // Honeypot: real users never see or fill this field.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

