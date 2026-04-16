import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
