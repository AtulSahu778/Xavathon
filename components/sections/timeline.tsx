import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function TimelineSection() {
  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="From registration to results"
            description="Short, clear stages so teams always know what comes next."
            align="center"
          />
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
          {siteContent.timeline.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="panel h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Step 0{index + 1}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/40 shadow-[0_0_16px_rgba(255,255,255,0.08)]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
