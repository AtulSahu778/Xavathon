"use client";

import { getStatusLabel, type HackathonPhase } from "@/lib/hackathon-phase";
import { Reveal } from "@/components/ui/reveal";

type StatusBannerProps = {
  phase: HackathonPhase;
};

export function StatusBanner({ phase }: StatusBannerProps) {
  const label = getStatusLabel(phase);

  if (!label) {
    return null;
  }

  return (
    <section className="px-6 py-2 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center px-4 py-2">
            <p className="text-sm font-semibold text-white sm:text-base">{label}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
