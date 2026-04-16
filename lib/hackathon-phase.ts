export type HackathonPhase =
  | "registration"
  | "problemReleased"
  | "live"
  | "resultsAnnounced"
  | "completed";

const IST_OFFSET_MINUTES = 330;
const RELEASE_DATE = { year: 2026, monthIndex: 3, day: 27 };
const HACKATHON_DATE = { year: 2026, monthIndex: 3, day: 28 };
const RESULTS_DATE = { year: 2026, monthIndex: 3, day: 29 };
const COMPLETED_DATE = { year: 2026, monthIndex: 3, day: 30 };

function toIstMidnightUtcMs(year: number, monthIndex: number, day: number) {
  return Date.UTC(year, monthIndex, day) - IST_OFFSET_MINUTES * 60 * 1000;
}

const releaseStartMs = toIstMidnightUtcMs(
  RELEASE_DATE.year,
  RELEASE_DATE.monthIndex,
  RELEASE_DATE.day,
);
const hackathonStartMs = toIstMidnightUtcMs(
  HACKATHON_DATE.year,
  HACKATHON_DATE.monthIndex,
  HACKATHON_DATE.day,
);
const resultsStartMs = toIstMidnightUtcMs(
  RESULTS_DATE.year,
  RESULTS_DATE.monthIndex,
  RESULTS_DATE.day,
);
const completedStartMs = toIstMidnightUtcMs(
  COMPLETED_DATE.year,
  COMPLETED_DATE.monthIndex,
  COMPLETED_DATE.day,
);

export function getHackathonPhase(now = new Date()): HackathonPhase {
  const nowMs = now.getTime();

  if (nowMs < releaseStartMs) {
    return "registration";
  }
  if (nowMs < hackathonStartMs) {
    return "problemReleased";
  }
  if (nowMs < resultsStartMs) {
    return "live";
  }
  if (nowMs < completedStartMs) {
    return "resultsAnnounced";
  }
  return "completed";
}

export function getStatusLabel(phase: HackathonPhase) {
  const labels: Record<HackathonPhase, string> = {
    registration: "Registration Phase",
    problemReleased: "Problem Statements Released",
    live: "Hackathon Live Now",
    resultsAnnounced: "Results Announced",
    completed: "Hackathon Completed",
  };

  return labels[phase];
}

export function getCountdownTarget(now = new Date()) {
  const nowMs = now.getTime();

  if (nowMs < releaseStartMs) {
    return {
      label: "Problem statements release in",
      targetMs: releaseStartMs,
    };
  }
  if (nowMs < hackathonStartMs) {
    return {
      label: "Hackathon starts in",
      targetMs: hackathonStartMs,
    };
  }
  if (nowMs < resultsStartMs) {
    return {
      label: "Results announcement in",
      targetMs: resultsStartMs,
    };
  }
  return null;
}

export function shouldShowProblems(phase: HackathonPhase) {
  return phase !== "registration";
}

export function shouldShowResults(phase: HackathonPhase) {
  return phase === "resultsAnnounced" || phase === "completed";
}
