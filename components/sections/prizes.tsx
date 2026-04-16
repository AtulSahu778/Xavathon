import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function PrizesSection() {
  return (
    <section id="prizes" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Prizes & Certificates"
            title="Prizes. Certificates. Recognition."
            description="Keep it simple: build well, present clearly, and get rewarded."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {siteContent.prizes.map((prize, index) => (
            <Reveal key={prize.title} delay={index * 0.08}>
              <div className="panel h-full p-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  {prize.title}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{prize.value}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{prize.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
