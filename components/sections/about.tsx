import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteContent } from "@/lib/site-content";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="About Xavathon"
            title={siteContent.about.title}
            description={siteContent.about.description}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-300">
              Collaboration
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{siteContent.collaboration.title}</h3>
            <p className="mt-4 text-base leading-8 text-zinc-400">{siteContent.collaboration.description}</p>

            <ul className="mt-6 space-y-3">
              {siteContent.collaboration.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-7 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-orange-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
