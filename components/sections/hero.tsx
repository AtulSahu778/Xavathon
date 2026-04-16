"use client";

import { motion } from "framer-motion";

import { siteContent } from "@/lib/site-content";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-20 pb-16 lg:px-8 lg:pt-28">
      <div className="hero-orb hero-orb-blue" />
      <div className="hero-orb hero-orb-green" />
      <div className="hero-orb hero-orb-orange" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
        <Reveal className="space-y-7">
          <Logo size="lg" priority className="h-auto w-[250px] object-contain sm:w-[320px]" />

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build. Pitch. <span className="text-white/90">Win.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              A clean, focused hackathon experience for student teams ready to ship strong ideas.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={siteContent.hero.primaryCta.href}
              className="glow-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              {siteContent.hero.primaryCta.label}
            </a>
            <a
              href={siteContent.hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              {siteContent.hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel relative overflow-hidden p-6 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">Event Snapshot</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {siteContent.hero.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
                  className="panel-subtle px-4 py-3 text-center"
                >
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm text-zinc-300">
              <p>• Team-based competition with guided mentorship</p>
              <p>• Fast tracks, clear judging, polished final showcase</p>
              <p>• Organized by IQAC + XTS (Computer Science Department)</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
