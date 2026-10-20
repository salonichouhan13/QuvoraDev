import { Resend } from "resend";
import type { ContactInput } from "./validation";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendLeadNotification(lead: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL;
  if (!apiKey || !to) throw new Error("Resend env vars missing");

  const resend = new Resend(apiKey);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#666"><b>${label}</b></td><td style="padding:6px 12px">${escapeHtml(value)}</td></tr>`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Quvora <onboarding@resend.dev>",
    to,
    replyTo: lead.email,
    subject: "New Project Inquiry – Quvora Website",
    html: `<h2>New Project Inquiry</h2>
      <table>${row("Name", lead.name)}${row("Email", lead.email)}${row("Phone", lead.phone)}
      ${row("Service", lead.service)}${row("Budget", lead.budget)}</table>
      <h3>Project Details</h3>
      <p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>`,
  });

  if (error) throw new Error(error.message);
}
