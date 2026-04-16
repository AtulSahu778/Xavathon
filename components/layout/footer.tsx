import { siteContent } from "@/lib/site-content";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#090909]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo size="md" className="h-auto w-[160px] object-contain" />
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            A premium college hackathon experience powered in collaboration with IQAC and XTS,
            the Computer Science Department club.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">Contact</h3>
          <p className="text-sm text-zinc-400">{siteContent.footer.email}</p>
          <p className="text-sm text-zinc-400">{siteContent.footer.phone}</p>
          <p className="text-sm text-zinc-400">{siteContent.footer.location}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">Social</h3>
          <div className="flex flex-wrap gap-3">
            {siteContent.footer.socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-5 text-center text-xs text-zinc-500 lg:px-8">
        Crafted for Xavathon. Credits: IQAC + XTS.
      </div>
    </footer>
  );
}
