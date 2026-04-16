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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const phase = useMemo(() => getHackathonPhase(now), [now]);
  const countdown = useMemo(() => getCountdownTarget(now), [now]);

  return (
    <>
      <StatusBanner phase={phase} />
      {countdown ? (
        <CountdownTimer label={countdown.label} targetMs={countdown.targetMs} nowMs={now.getTime()} />
      ) : null}
      <ProblemSection problems={siteContent.problemStatements} isVisible={shouldShowProblems(phase)} />
      <ResultsSection results={siteContent.results} isVisible={shouldShowResults(phase)} />
    </>
  );
}
