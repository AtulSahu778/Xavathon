"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ResultItem = {
  position: string;
  team: string;
  project: string;
};

type ResultsSectionProps = {
  results: ResultItem[];
  isVisible: boolean;
};

export function ResultsSection({ results, isVisible }: ResultsSectionProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <section id="results" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="Winners announced"
            description="Final standings are now available based on judging outcomes."
            align="center"
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {results.map((result, index) => (
            <Reveal key={result.position} delay={index * 0.07}>
              <article className="panel h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  {result.position}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{result.team}</h3>
                <p className="mt-2 text-sm text-zinc-300">{result.project}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
