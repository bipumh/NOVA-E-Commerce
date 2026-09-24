import type { ReactNode } from "react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Eyebrow } from "@/components/shared/section-heading";

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: PolicySection[];
  children?: ReactNode;
}) {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

      <div className="mt-8 max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.02em] text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
          {intro}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.14em] text-dim">
          Last updated · {updated}
        </p>
      </div>

      {children}

      <div className="mt-12 max-w-3xl space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-medium text-ink">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
