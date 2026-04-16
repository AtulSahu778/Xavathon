import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function ShortlistingManagementSection() {
  return (
    <section id="shortlisting" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Shortlisting Process"
            title="How teams are shortlisted"
            description="Selection includes a short interview round and review against core evaluation criteria."
          />
        </Reveal>

        <Reveal>
          <div className="panel h-full p-7">
            <p className="text-sm leading-7 text-zinc-300">{siteContent.shortlistingProcess.intro}</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {siteContent.shortlistingProcess.interview}
            </p>
            <p className="mt-4 rounded-2xl border border-orange-300/30 bg-orange-500/10 px-4 py-3 text-sm font-medium leading-7 text-orange-100">
              {siteContent.shortlistingProcess.selectionNote}
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Final selection is based on
            </p>
            <ul className="mt-4 space-y-2">
              {siteContent.shortlistingProcess.criteria.map((criterion) => (
                <li key={criterion} className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
