import Reveal from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const steps = [
  { title: "Discovery", text: "We learn your goals, audience and requirements, then agree on scope, timeline and budget." },
  { title: "Design", text: "Wireframes and polished mockups so you can see and approve the look before we build." },
  { title: "Development", text: "Clean, tested code with regular demos, so you're never left guessing." },
  { title: "Launch", text: "Deployment, final checks and handover, plus support to keep everything running well." },
];

export default function Process() {
  return (
    <section className="section">
      <SectionHeading eyebrow="How we work" title="A simple, transparent process" />
      <ol className="grid gap-5 md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <li className="h-full list-none">
              <Card className="h-full">
                <CardContent>
                  <span className="font-display gradient-text text-3xl font-semibold">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.text}</p>
                </CardContent>
              </Card>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
