import type { Metadata } from "next";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT, SERVICES, SITE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Quvora. Send your requirements or message us on WhatsApp, email or AtSign.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const defaultService = SERVICES.find((s) => s === service) ?? "";

  return (
    <>
      <section className="section">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-300">Contact</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Let's build your project</h1>
          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">Share a few details and we'll get back to you with next steps. Prefer chatting? Use WhatsApp.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm defaultService={defaultService} />
          </div>
          <aside className="space-y-3 lg:col-span-2" aria-label="Other ways to reach us">
            <a href={whatsappLink(CONTACT.whatsappPrimary)} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full justify-start" })}>
              <MessageCircle size={18} className="text-emerald-400" /> WhatsApp: +91 90982 18202
            </a>
            <a href={whatsappLink(CONTACT.whatsappSecondary)} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full justify-start" })}>
              <MessageCircle size={18} className="text-emerald-400" /> WhatsApp: +91 62610 44962
            </a>
            <a href={`mailto:${SITE.email}`} className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full justify-start" })}>
              <Mail size={18} className="text-violet-300" /> {SITE.email}
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full justify-start" })}>
              <AtSign size={18} className="text-pink-300" /> @quvoradev
            </a>
          </aside>
        </div>
      </section>

      <section className="section pt-4">
        <h2 className="font-display mb-8 text-center text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
        <FAQ />
      </section>
    </>
  );
}
