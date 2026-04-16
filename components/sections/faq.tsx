import { FaqItem } from "@/components/ui/faq-item";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/site-content";

export function FaqSection() {
  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers for common participant questions"
            description="A quick overview of participation, team setup, certificates, and judging."
            align="center"
          />
        </Reveal>

        <div className="space-y-4">
          {siteContent.faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <FaqItem question={item.question} answer={item.answer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
