import { site } from "@/data/site";

const messages = [
  site.support.shippingNote,
  site.support.returnNote,
  site.support.warrantyNote,
];

// Repeat each message so a single half of the marquee is always wider than
// the viewport — this keeps the -50% loop seamless on large screens.
const repeated = Array.from({ length: 3 }, () => messages).flat();

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden border-b border-line bg-charcoal text-ink">
      <div className="marquee-track py-2.5">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {repeated.map((text, i) => (
              <span
                key={i}
                className="flex items-center gap-3 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/80"
              >
                {text}
                <span className="h-1 w-1 rounded-full bg-clay" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
