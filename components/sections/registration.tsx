import { Reveal } from "@/components/ui/reveal";


const guidelines = [
  "Team leader is required; additional team members are optional (up to 5 total)",
  "Only 11 teams will be shortlisted from the Computer Science Department",
  "Selection will be based on idea quality, clarity, and innovation",
  "Problem statements will be released, after which teams must start building their solution",
  "Teams must demonstrate their working prototype on 28 April",
  "Final results will be announced on 29 April",
];

const readyChecklist = [
  "Leader details (name, email, phone, class roll no., course) and optional member details",
  "Department and semester",
  "Project title, problem statement, and description",
  "Preferred domain and technologies",
];

export function RegistrationSection() {
  return (
    <section id="register" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
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
                Complete the guided steps below. Your submission is saved securely for organizer review.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="panel h-full space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Important guidelines</p>
                <p className="mt-1 text-base font-semibold text-white">Read before registering</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">Keep this ready</p>
                <ul className="mt-3 space-y-2">
                  {readyChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/80" />
                      <span className="text-xs leading-5 text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
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
                  Shortlisted teams will be contacted via email or phone. Ensure contact details are accurate.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/2 px-4 py-4 sm:px-6">
                <p className="truncate text-sm font-semibold text-white">Official registration</p>
              </div>
              <div className="p-4 sm:p-6">
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
