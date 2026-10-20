import { MessageCircle } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(CONTACT.whatsappPrimary)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Quvora on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 transition hover:scale-105 hover:bg-emerald-400"
    >
      <MessageCircle size={26} />
    </a>
  );
}
