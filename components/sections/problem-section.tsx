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
          <>
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
            <Reveal delay={0.2}>
              <div className="mt-10 flex justify-center">
                <a
                  href="/Xavathon_ProblemBooklet.pdf"
                  download="Xavathon_ProblemBooklet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-white/20 hover:bg-white/8 hover:text-white transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download Problem Booklet
                </a>
              </div>
            </Reveal>
          </>
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
