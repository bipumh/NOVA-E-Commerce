import type { Metadata } from "next";
import { Globe, Package, Truck } from "lucide-react";
import { LegalPage, type PolicySection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Shipping options, delivery times and tracking information for NOVA orders.",
};

const sections: PolicySection[] = [
  {
    heading: "Processing times",
    paragraphs: [
      "Orders are processed Monday to Friday and dispatched within 1–2 business days. Orders placed after 12pm ET are processed the following business day. You will receive a confirmation email the moment your order ships.",
    ],
  },
  {
    heading: "Tracking your order",
    paragraphs: [
      "Every order includes tracking. As soon as your package leaves our studio, we email you a tracking link so you can follow its progress to your door.",
    ],
  },
  {
    heading: "International orders",
    paragraphs: [
      "We ship worldwide. Delivery times vary by destination and are calculated at checkout. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.",
    ],
  },
  {
    heading: "Delays",
    paragraphs: [
      "During peak periods or severe weather, carriers may occasionally experience delays beyond our control. If your order is running late, reach out and we will investigate on your behalf.",
    ],
  },
];

const options = [
  {
    icon: Package,
    title: "Standard",
    text: "5–7 business days",
    note: "Free on orders over $150",
  },
  {
    icon: Truck,
    title: "Express",
    text: "2–3 business days",
    note: "Flat rate $25",
  },
  {
    icon: Globe,
    title: "International",
    text: "7–14 business days",
    note: "Calculated at checkout",
  },
];

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Support"
      title="Shipping & delivery"
      intro="Every order is packed with care in our studio and shipped with tracked, insured delivery. Here is what to expect."
      updated="September 2026"
      sections={sections}
    >
      <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.title}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-clay">
              <option.icon aria-hidden className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-medium text-ink">{option.title}</h2>
            <p className="mt-1 text-sm font-medium text-clay">{option.text}</p>
            <p className="mt-1 text-xs text-muted">{option.note}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
