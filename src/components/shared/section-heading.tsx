import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/shared/reveal";

export function Eyebrow({
  children,
  className,
  tone = "primary",
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
        tone === "light" ? "text-ink/80" : "text-clay",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-8", tone === "light" ? "bg-ink/40" : "bg-clay/50")}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "primary",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "primary" | "light";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="up">
          <Eyebrow tone={tone} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.06} direction="up">
        <h2
          className={cn(
            "mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]",
            tone === "light" ? "text-ink" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12} direction="up">
          <div
            className={cn(
              "mt-4 max-w-2xl text-[15px] leading-relaxed sm:text-[17px]",
              tone === "light" ? "text-ink/75" : "text-muted",
            )}
          >
            {description}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
