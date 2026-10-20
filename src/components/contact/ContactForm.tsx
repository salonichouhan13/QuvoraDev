"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BUDGETS, SERVICES } from "@/lib/constants";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "service" | "budget" | "message", string[]>>;

export default function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("loading");
    setError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields);
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="glass flex flex-col items-center rounded-2xl p-10 text-center">
        <CheckCircle2 className="text-emerald-400" size={44} />
        <h3 className="font-display mt-4 text-2xl font-semibold">Thank you! Your inquiry is in.</h3>
        <p className="mt-2 max-w-sm text-sm text-zinc-400">We'll review your project details and get back to you on WhatsApp or email shortly.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>Send another inquiry</Button>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    fieldErrors[k]?.[0] ? (
      <p id={`${k}-error`} className="mt-1.5 text-xs text-rose-400">{fieldErrors[k]![0]}</p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({ "aria-invalid": !!fieldErrors[k], "aria-describedby": fieldErrors[k] ? `${k}-error` : undefined });
  const label = "mb-1.5 block text-sm font-medium text-zinc-300";

  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-2xl p-6 sm:p-8">
      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Your name" {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={label}>WhatsApp Number</label>
        <Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" {...a11y("phone")} />
        {err("phone")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={label}>Service</label>
          <Select id="service" name="service" required defaultValue={defaultService} {...a11y("service")}>
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
          {err("service")}
        </div>
        <div>
          <label htmlFor="budget" className={label}>Budget</label>
          <Select id="budget" name="budget" required defaultValue="" {...a11y("budget")}>
            <option value="" disabled>Select a budget</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </Select>
          {err("budget")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Project Details</label>
        <Textarea id="message" name="message" required maxLength={2000} placeholder="Tell us what you want to build, your goals and any deadlines." {...a11y("message")} />
        {err("message")}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (<><Loader2 className="animate-spin" size={18} /> Sending...</>) : "Send Project Inquiry"}
      </Button>
    </form>
  );
}
