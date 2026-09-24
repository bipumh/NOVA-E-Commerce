import type { Metadata } from "next";
import { LegalPage, type PolicySection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "Our 30-day return policy and how to start a return or exchange at NOVA.",
};

const sections: PolicySection[] = [
  {
    heading: "Our policy",
    paragraphs: [
      "We want you to love what you ordered. If a piece isn't quite right, you have 30 days from delivery to return it for a full refund — no questions asked.",
    ],
  },
  {
    heading: "Condition",
    paragraphs: [
      "Items must be returned in their original condition — unworn, unwashed and with tags attached. Footwear should be tried on a clean, soft surface. Items marked final sale cannot be returned.",
    ],
  },
  {
    heading: "Refunds",
    paragraphs: [
      "Once we receive and inspect your return, your refund is issued to the original payment method within 5–7 business days. Original shipping charges are refunded only when the return is due to a fault on our part.",
    ],
  },
  {
    heading: "Exchanges",
    paragraphs: [
      "Need a different size or colour? Start an exchange and we'll hold the replacement while your return is on its way back to us. Exchanges are always free.",
    ],
  },
];

const steps = [
  {
    title: "Start a return",
    text: "Email us your order number within 30 days and we'll send a prepaid return label.",
  },
  {
    title: "Pack it up",
    text: "Repack the item in its original packaging and attach the prepaid label.",
  },
  {
    title: "Send it back",
    text: "Drop it at any carrier location. We'll handle the rest and refund you promptly.",
  },
];

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="Support"
      title="Returns & exchanges"
      intro="Returns and exchanges are free and easy. If a piece isn't right, we'll make it right within 30 days."
      updated="September 2026"
      sections={sections}
    >
      <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-2xl border border-line bg-surface p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper">
              {i + 1}
            </span>
            <h2 className="mt-4 text-base font-medium text-ink">{step.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
