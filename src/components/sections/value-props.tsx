import { Leaf, RotateCcw, Truck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const VALUES = [
  {
    icon: Truck,
    title: "Complimentary shipping",
    text: "Free delivery on all orders over $150, worldwide.",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    text: "Free, easy returns if something isn't quite right.",
  },
  {
    icon: ShieldCheck,
    title: "Craftsmanship guarantee",
    text: "A two-year guarantee on every piece we make.",
  },
  {
    icon: Leaf,
    title: "Responsible materials",
    text: "Traceable natural fibres, sourced with care.",
  },
];

export function ValueProps() {
  return (
    <section className="border-t border-line bg-paper">
      <Container className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value) => (
          <div key={value.title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-clay">
              <value.icon aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">{value.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{value.text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
