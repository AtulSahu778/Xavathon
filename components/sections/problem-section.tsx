"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ProblemItem = {
  title: string;
  description: string;
  track: string;
};

type ProblemSectionProps = {
  problems: ProblemItem[];
  isVisible: boolean;
};

export function ProblemSection({ problems, isVisible }: ProblemSectionProps) {
  return (
    <section id="problems" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Problem Statements"
            title="Build around real, high-impact challenges"
            description="Statements become visible automatically when the release window starts."
            align="center"
          />
        </Reveal>

        {isVisible ? (
          <div className="grid gap-4 md:grid-cols-2">
            {problems.map((problem, index) => (
              <Reveal key={problem.title} delay={index * 0.06}>
                <article className="panel h-full p-6">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">
                    {problem.track}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{problem.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="panel mx-auto max-w-3xl p-8 text-center">
              <p className="text-lg font-medium text-zinc-200">
                Problem statements will be revealed soon
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
