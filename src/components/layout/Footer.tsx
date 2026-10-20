import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";

const linkClass = "inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold">
            Quvora<span className="gradient-text">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-semibold text-zinc-200">Quick links</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-200">Get in touch</p>
          <ul className="space-y-2">
            <li>
              <a href={whatsappLink(CONTACT.whatsappPrimary)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MessageCircle size={16} /> +91 90982 18202
              </a>
            </li>
            <li>
              <a href={whatsappLink(CONTACT.whatsappSecondary)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MessageCircle size={16} /> +91 62610 44962
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                <Mail size={16} /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <AtSign size={16} /> @quvoradev
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Quvora. All rights reserved.
      </div>
    </footer>
  );
}
