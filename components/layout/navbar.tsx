"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { MouseEvent } from "react";

import { navLinks } from "@/lib/site-content";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToHash = (hash: string) => {
    if (!hash.startsWith("#")) {
      return;
    }

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) {
      return;
    }

    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", hash);
  };

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    // Wait for menu close animation frame, then perform deterministic scroll.
    window.setTimeout(() => {
      scrollToHash(href);
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0b0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="inline-flex items-center gap-3">
          <Logo size="sm" priority className="h-auto w-[110px] object-contain" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#register-form"
            className="btn-premium rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-5 py-2 text-sm font-bold text-black shadow-[0_10px_30px_rgba(249,115,22,0.45)] transition hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(249,115,22,0.55)]"
          >
            Register Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="btn-premium inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
        >
          <span className="text-xl">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
              <a
                href="#register-form"
                onClick={(event) => handleMobileNavClick(event, "#register-form")}
                className="btn-premium rounded-2xl border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-4 py-3 text-center text-sm font-bold text-black shadow-[0_10px_28px_rgba(249,115,22,0.4)]"
              >
                Register Now
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleMobileNavClick(event, link.href)}
                  className="btn-premium rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
