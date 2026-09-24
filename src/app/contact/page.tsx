import type { Metadata } from "next";
import { Clock, MapPin, Mail } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Eyebrow } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialIcons } from "@/components/shared/social-icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the NOVA team — questions about orders, products or partnerships.",
};

const details = [
  {
    icon: Mail,
    title: "Email us",
    lines: [site.email, "Replies within 1–2 business days"],
  },
  {
    icon: Clock,
    title: "Support hours",
    lines: ["Monday – Friday", "9am – 6pm ET"],
  },
  {
    icon: MapPin,
    title: "Studio",
    lines: [`${site.city}, ${site.country}`, "By appointment only"],
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.02em] text-ink sm:text-5xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
            Whether it&apos;s a question about an order, a product, or a
            partnership — our small team reads every message.
          </p>

          <div className="mt-8 space-y-4">
            {details.map((detail) => (
              <div
                key={detail.title}
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-clay">
                  <detail.icon aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-ink">{detail.title}</h2>
                  {detail.lines.map((line) => (
                    <p key={line} className="mt-0.5 text-sm text-muted">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">
              Follow along
            </p>
            <div className="mt-3">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
