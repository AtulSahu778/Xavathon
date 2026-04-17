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
            description="Selection includes a short interview round."
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

          </div>
        </Reveal>
      </div>
    </section>
  );
}
