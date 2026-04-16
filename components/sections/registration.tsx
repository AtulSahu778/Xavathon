import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

export function RegistrationSection() {
  return (
    <section id="register" className="px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Registration"
            title="Lock in your spot at Xavathon"
            description="Registrations are collected through the official Google Form for a smooth, reliable signup experience."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-white/5 bg-white/3 px-6 py-5">
              <p className="text-sm font-semibold text-white">Official Registration Form</p>
              {googleFormUrl ? (
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
                >
                  Open in new tab
                </a>
              ) : null}
            </div>

            {googleFormUrl ? (
              <iframe
                title="Xavathon registration form"
                src={googleFormUrl}
                className="h-[720px] w-full bg-transparent"
              />
            ) : (
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-7 text-zinc-400">
                  Add <span className="text-zinc-200">NEXT_PUBLIC_GOOGLE_FORM_URL</span> to your environment
                  to embed the official Google Form here.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
