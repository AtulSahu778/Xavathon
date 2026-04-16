import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function TermsSection() {
  return (
    <section id="terms" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Terms & Conditions"
            title="Clear rules for a fair and high-quality event"
            description="These baseline terms cover participation, originality, judging expectations, and organizer flexibility."
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {siteContent.terms.map((term, index) => (
            <Reveal key={term} delay={index * 0.06}>
              <div className="panel flex h-full gap-4 p-6">
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-zinc-400">{term}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
