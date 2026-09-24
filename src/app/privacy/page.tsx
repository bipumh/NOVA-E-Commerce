import type { Metadata } from "next";
import { LegalPage, type PolicySection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NOVA collects, uses and protects your personal information when you shop with us.",
};

const sections: PolicySection[] = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect the information you provide when you create an account, place an order, or contact us — including your name, email address, shipping address and payment details.",
      "We also collect limited technical information automatically, such as your device type, browser and pages you visit, to keep the store running smoothly and improve your experience.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "To process and deliver your orders, and to send order confirmations.",
      "To personalise your experience and recommend products you may like.",
      "To respond to enquiries and provide customer support.",
      "To comply with legal obligations and prevent fraud.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use essential cookies to keep your cart and wishlist in sync, and optional analytics cookies to understand how the store is used. You can disable non-essential cookies at any time without affecting core functionality.",
    ],
  },
  {
    heading: "How we share information",
    paragraphs: [
      "We never sell your personal information. We share only what is necessary with trusted partners — payment processors, shipping carriers and hosting providers — each bound by their own confidentiality obligations.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, email us and we will respond within 30 days.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We retain your information only as long as needed to fulfil orders, meet legal requirements, and provide support. When it is no longer required, it is securely deleted.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about this policy? Contact us at hello@nova-studio.com or via our contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what we collect, why we collect it, and how we keep your information safe."
      updated="September 2026"
      sections={sections}
    />
  );
}
