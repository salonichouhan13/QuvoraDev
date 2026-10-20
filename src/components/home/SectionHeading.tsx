import Reveal from "@/components/motion/Reveal";

export default function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c9a57c]">— {eyebrow} —</p>
      <h2 className="font-display mt-4 text-3xl tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 leading-relaxed text-zinc-400">{subtitle}</p>}
    </Reveal>
  );
}
