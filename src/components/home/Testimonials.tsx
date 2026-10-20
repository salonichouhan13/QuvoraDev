import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Reveal from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Testimonials" title="Client stories coming soon" subtitle="We're building our track record. Genuine reviews will be featured here." />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.07}>
            <Card className="h-full border-dashed">
              <CardContent>
                <Quote className="text-violet-300/70" size={26} />
                <h3 className="font-display mt-4 text-base font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
