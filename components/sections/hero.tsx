"use client";

import Image from "next/image";

import { siteContent } from "@/lib/site-content";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6">
      <div className="hero-orb hero-orb-blue" />
      <div className="hero-orb hero-orb-green" />
      <div className="hero-orb hero-orb-orange" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="space-y-6 text-center">

          {/* Registration Closed Badge */}
          <div className="flex items-center justify-center">
            <div className="relative inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-400 backdrop-blur-sm">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Registration Closed
            </div>
          </div>

          {/* Logo + Subtitle */}
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/heroxavathon.png"
              alt="Xavathon"
              width={720}
              height={300}
              priority
              className="mb-3 h-auto w-full max-w-xl opacity-90"
            />
            <p className="text-sm font-medium tracking-wide text-zinc-300 -mt-1">
              A premium college hackathon, initiative in association with IQAC and XTS.
            </p>
          </div>

          {/* Closed state message */}
          <div className="mx-auto max-w-sm rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1">
              Applications have ended
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Registrations are now closed. Stay tuned for updates on the next edition.
            </p>
          </div>

          {/* Actions — only secondary CTA remains actionable */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">

            {/* Closed / disabled primary slot */}
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-7 py-3 text-sm font-bold text-zinc-500 shadow-none select-none"
            >
              {/* Lock icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Registrations Closed
            </span>

            {/* Secondary CTA stays fully active */}
            <a
              href={siteContent.hero.secondaryCta.href}
              className="btn-premium inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              {siteContent.hero.secondaryCta.label}
            </a>
          </div>

        </Reveal>
      </div>
    </section>
  );
}