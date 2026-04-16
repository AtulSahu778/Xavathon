"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

const guidelines = [
  "Each team must consist of exactly 4 members (1 leader + 3 members)",
  "Only 13 teams will be shortlisted from the CS Department",
  "Selection is based on idea quality, clarity, and innovation",
  "Problem statements release on 27 April — build starts then",
  "Working prototype demo on 28 April",
  "Final results announced on 29 April",
];

export function RegistrationSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="register" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">

        {/* ── Header row ── */}
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Registration
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Lock in your spot at Xavathon
              </h2>
              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                Registrations are live now. Submit early to secure your team slot before the final shortlist closes.
              </p>
            </div>
            {googleFormUrl && (
              <a
                href={googleFormUrl.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full shrink-0 text-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:mt-0 sm:w-auto sm:py-2.5"
              >
                Open in new tab ↗
              </a>
            )}
          </div>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">

          {/* Guidelines card */}
          <Reveal>
            <div className="panel h-full space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Important Guidelines
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  Read before registering
                </p>
              </div>

              <ul className="space-y-4">
                {guidelines.map((g, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-zinc-400">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-6 text-zinc-400">{g}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-amber-400/15 bg-amber-400/5 px-4 py-3">
                <p className="text-xs leading-5 text-amber-300/80">
                  ⚠️ Shortlisted teams will be contacted via email or phone. Ensure contact details are accurate.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={0.1}>
            <div className="panel overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 sm:px-6 py-4">
                <span className="shrink-0 h-2 w-2 rounded-full bg-green-400/80" />
                <p className="truncate text-sm font-semibold text-white">Official Registration Form</p>
                
              </div>

              {/* iFrame wrapper — white bg scoped here so it doesn't bleed */}
              {googleFormUrl ? (
                <div className="relative bg-white">
                  {/* Loading shimmer */}
                  {!loaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-500" />
                      <p className="text-xs text-zinc-400">Loading form…</p>
                    </div>
                  )}
                  <iframe
                    title="Xavathon registration form"
                    src={googleFormUrl}
                    onLoad={() => setLoaded(true)}
                    className="h-[1350px] sm:h-[900px] md:h-[780px] w-full border-0"
                    style={{ display: "block" }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                  <p className="text-sm leading-7 text-zinc-400">
                    Set{" "}
                    <code className="rounded bg-white/8 px-1.5 py-0.5 text-xs text-zinc-200">
                      NEXT_PUBLIC_GOOGLE_FORM_URL
                    </code>{" "}
                    in your environment to embed the form.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
