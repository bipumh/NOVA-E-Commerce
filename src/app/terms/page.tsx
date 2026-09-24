import type { Metadata } from "next";
import { LegalPage, type PolicySection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the NOVA website and the purchase of our products.",
};

const sections: PolicySection[] = [
  {
    heading: "Use of the site",
    paragraphs: [
      "By accessing novastudio.com, you agree to use the site lawfully and for its intended purpose. You may not misuse the site, attempt to gain unauthorised access, or interfere with its operation.",
    ],
  },
  {
    heading: "Orders & payment",
    paragraphs: [
      "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order in the event of a pricing error or suspected fraud, in which case you will be refunded in full.",
      "Payment is taken at the time of purchase through our secure payment partners. Your card details are never stored on our servers.",
    ],
  },
  {
    heading: "Pricing",
    paragraphs: [
      "Prices are shown in your selected currency and include applicable taxes where required. We work to ensure accuracy, but in the rare event of a mispriced item we will contact you before proceeding.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "All content on this site — including designs, photography, copy and the NOVA name and logo — is the property of NOVA Studio Ltd. and may not be reproduced without written permission.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, NOVA is not liable for indirect or consequential loss arising from your use of the site, including loss of data or profits.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the United States. Any disputes will be resolved in the courts of New York.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these terms? Contact us at hello@nova-studio.com or via our contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms govern your use of the NOVA website and the purchase of our products. Please read them carefully."
      updated="September 2026"
      sections={sections}
    />
  );
}
