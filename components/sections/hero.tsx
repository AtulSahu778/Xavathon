"use client";

import { siteContent } from "@/lib/site-content";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6">
      <div className="hero-orb hero-orb-blue" />
      <div className="hero-orb hero-orb-green" />
      <div className="hero-orb hero-orb-orange" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="space-y-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Logo size="lg" priority className="h-auto w-[420px] object-contain sm:w-[480px] lg:w-[580px]" />
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-[0.15em] text-white uppercase">
                Ignite the Future with Code
              </p>
              <p className="text-[10px] font-medium tracking-[0.05em] text-zinc-500 uppercase">
                In Association with IQAC and XTS
              </p>
            </div>
          </div>



          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={siteContent.hero.primaryCta.href}
              className="btn-premium inline-flex items-center justify-center rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-bold text-black shadow-[0_12px_32px_rgba(249,115,22,0.45)] transition hover:scale-[1.02] hover:shadow-[0_16px_42px_rgba(249,115,22,0.55)]"
            >
              {siteContent.hero.primaryCta.label} - Limited Slots
            </a>
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
