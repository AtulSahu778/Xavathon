"use client";

import { siteContent } from "@/lib/site-content";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-16 pb-10 lg:px-8 lg:pt-20 lg:pb-12">
      <div className="hero-orb hero-orb-blue" />
      <div className="hero-orb hero-orb-green" />
      <div className="hero-orb hero-orb-orange" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="space-y-7 text-center">
          <div className="flex justify-center">
            <Logo size="lg" priority className="h-auto w-[300px] object-contain sm:w-[420px] lg:w-[520px]" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build. Pitch. <span className="text-white/90">Win.</span>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              A clean, focused hackathon experience for student teams ready to ship strong ideas.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={siteContent.hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-bold text-black shadow-[0_12px_32px_rgba(249,115,22,0.45)] transition hover:scale-[1.02] hover:shadow-[0_16px_42px_rgba(249,115,22,0.55)]"
            >
              {siteContent.hero.primaryCta.label} - Limited Slots
            </a>
            <a
              href={siteContent.hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              {siteContent.hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
