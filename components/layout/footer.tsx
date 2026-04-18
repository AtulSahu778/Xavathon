import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#090909]">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Logo size="md" className="h-auto w-[160px] object-contain" />
          </div>
          <p className="mx-auto max-w-md text-sm leading-7 text-zinc-400">
            A premium college hackathon, initiative in association with IQAC and XTS.
          </p>
          <div className="space-y-2 text-sm font-medium text-zinc-200">
            <p>If need help, message us on WhatsApp:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/918825193783"
                target="_blank"
                rel="noreferrer"
                className="btn-premium rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
              >
                +91 88251 93783
              </a>
              <a
                href="https://wa.me/918789313228"
                target="_blank"
                rel="noreferrer"
                className="btn-premium rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
              >
                +91 878 931 3228
              </a>
            </div>
            <p className="pt-1 text-zinc-300">
              Official Email:{" "}
              <a
                href="mailto:xavathon@sxcran.org"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                xavathon@sxcran.org
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-5 text-center text-xs text-zinc-500 lg:px-8">
        Crafted for Xavathon – Ignite the Future with Code. Credits: IQAC + XTS.
      </div>
    </footer>
  );
}
