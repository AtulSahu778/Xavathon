"use client";

import { Reveal } from "@/components/ui/reveal";

type CountdownTimerProps = {
  label: string;
  targetMs: number;
  nowMs: number;
};

function getTimeLeft(targetMs: number, nowMs: number) {
  const difference = Math.max(targetMs - nowMs, 0);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function CountdownTimer({ label, targetMs, nowMs }: CountdownTimerProps) {
  const timeLeft = getTimeLeft(targetMs, nowMs);

  return (
    <section className="px-6 py-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-7xl space-y-4">
          <p className="text-center text-sm font-medium text-zinc-300 sm:text-base">{label}</p>
          <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="panel-subtle flex flex-col items-center gap-1 px-3 py-4">
                <span className="text-2xl font-semibold text-white sm:text-3xl">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
