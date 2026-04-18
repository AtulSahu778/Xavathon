import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function FeaturesSection() {
  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Why to Participate"
            title="Simple. Focused. Competitive."
            description="Clear tracks, mentor support, and a polished final showcase — without unnecessary complexity."
            align="center"
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {siteContent.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <div className="panel group h-full p-6 transition duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{feature.description}</p>
                  </div>
                  <div className="hidden h-10 w-10 shrink-0 rounded-2xl border border-white/10 bg-white/5 sm:flex items-center justify-center">
                    <span className="text-sm font-semibold text-zinc-200">0{index + 1}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
