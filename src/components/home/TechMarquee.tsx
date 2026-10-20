const tech = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Flask", "PostgreSQL", "Prisma", "Supabase"];

export default function TechMarquee() {
  const row = [...tech, ...tech]; // duplicated so the loop is seamless
  return (
    <div className="marquee overflow-hidden border-y border-[#c9a57c]/15 bg-white/[0.03] py-5" aria-label="Technologies we work with">
      <div className="marquee-track" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i} className="font-display flex items-center text-lg italic text-zinc-400">
            <span className="px-6">{t}</span>
            <span className="text-[#c9a57c]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
