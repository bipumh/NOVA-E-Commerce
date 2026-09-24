import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Container } from "@/components/ui/container";
import {
  accountLinks,
  companyLinks,
  footerLinks,
  legalLinks,
  site,
  supportLinks,
} from "@/data/site";
import { SocialIcons } from "@/components/shared/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-6">
              <SocialIcons />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <FooterColumn title="Shop" links={footerLinks} />
            <FooterColumn title="Account" links={accountLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.14em]">{site.country}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="link-underline text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
