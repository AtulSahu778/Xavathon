"use client";

import { useEffect, useMemo, useState } from "react";

import { siteContent } from "@/lib/site-content";
import {
  getCountdownTarget,
  getHackathonPhase,
  shouldShowProblems,
  shouldShowResults,
} from "@/lib/hackathon-phase";
import { CountdownTimer } from "@/components/sections/countdown-timer";
import { ProblemSection } from "@/components/sections/problem-section";
import { ResultsSection } from "@/components/sections/results-section";
import { StatusBanner } from "@/components/sections/status-banner";

export function HackathonControl() {
  const [nowMs, setNowMs] = useState<number | null>(null);
  const now = useMemo(() => new Date(nowMs ?? 0), [nowMs]);

  useEffect(() => {
    const updateNow = () => setNowMs(Date.now());
    updateNow();
    const timer = window.setInterval(() => {
      updateNow();
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const phase = useMemo(() => (nowMs === null ? null : getHackathonPhase(now)), [now, nowMs]);
  const countdown = useMemo(() => (nowMs === null ? null : getCountdownTarget(now)), [now, nowMs]);

  return (
    <>
      {phase ? <StatusBanner phase={phase} /> : null}
      {countdown && nowMs !== null ? (
        <CountdownTimer label={countdown.label} targetMs={countdown.targetMs} nowMs={nowMs} />
      ) : null}
      <ProblemSection
        problems={siteContent.problemStatements}
        isVisible={phase ? shouldShowProblems(phase) : false}
      />
      <ResultsSection results={siteContent.results} isVisible={phase ? shouldShowResults(phase) : false} />
    </>
  );
}
