import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT, whatsappLink } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="section">
      <Reveal>
        <div className="rounded-3xl border border-[#c9a57c]/25 bg-[#4d2f1c] px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Ready to build <em className="gradient-text">something great?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-300">Tell us about your idea. We'll reply with a clear plan, timeline and quote.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>Start a Project</Link>
            <a href={whatsappLink(CONTACT.whatsappPrimary)} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", variant: "secondary" })}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
