"use client";

import { getStatusLabel, type HackathonPhase } from "@/lib/hackathon-phase";
import { Reveal } from "@/components/ui/reveal";

type StatusBannerProps = {
  phase: HackathonPhase;
};

export function StatusBanner({ phase }: StatusBannerProps) {
  return (
    <section className="px-6 py-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="panel-subtle flex items-center justify-between gap-4 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Current Event Phase
            </p>
            <p className="text-sm font-semibold text-white sm:text-base">{getStatusLabel(phase)}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
