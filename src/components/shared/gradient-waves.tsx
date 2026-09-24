import { cn } from "@/lib/cn";

const WAVES = [
  {
    top: "-14%",
    left: "-8%",
    size: "62vw",
    background:
      "radial-gradient(circle at 50% 50%, rgb(216 182 122 / 0.28) 0%, rgb(216 182 122 / 0) 66%)",
    duration: "26s",
    delay: "0s",
    reverse: false,
  },
  {
    top: "26%",
    right: "-16%",
    size: "56vw",
    background:
      "radial-gradient(circle at 50% 50%, rgb(226 200 160 / 0.24) 0%, rgb(226 200 160 / 0) 68%)",
    duration: "20s",
    delay: "-8s",
    reverse: true,
  },
  {
    top: "52%",
    left: "6%",
    size: "48vw",
    background:
      "radial-gradient(circle at 50% 50%, rgb(178 126 78 / 0.22) 0%, rgb(178 126 78 / 0) 68%)",
    duration: "23s",
    delay: "-13s",
    reverse: false,
  },
  {
    bottom: "-24%",
    left: "16%",
    size: "72vw",
    background:
      "radial-gradient(circle at 50% 50%, rgb(156 132 96 / 0.18) 0%, rgb(156 132 96 / 0) 70%)",
    duration: "29s",
    delay: "-5s",
    reverse: true,
  },
  {
    top: "8%",
    left: "38%",
    size: "40vw",
    background:
      "radial-gradient(circle at 50% 50%, rgb(198 168 118 / 0.15) 0%, rgb(198 168 118 / 0) 64%)",
    duration: "24s",
    delay: "-16s",
    reverse: false,
  },
];

const SPARKLES = [
  { top: "18%", left: "12%", size: "5px", duration: "6s", delay: "0s" },
  { top: "12%", left: "34%", size: "3px", duration: "8s", delay: "2s" },
  { top: "22%", left: "58%", size: "4px", duration: "7s", delay: "4s" },
  { top: "10%", left: "74%", size: "6px", duration: "9s", delay: "1s" },
  { top: "28%", left: "86%", size: "3px", duration: "6.5s", delay: "3s" },
  { top: "34%", left: "22%", size: "4px", duration: "7.5s", delay: "5s" },
  { top: "8%", left: "46%", size: "3px", duration: "8.5s", delay: "2.5s" },
  { top: "40%", left: "66%", size: "4px", duration: "7s", delay: "6s" },
  { top: "16%", left: "94%", size: "5px", duration: "9.5s", delay: "0.5s" },
  { top: "48%", left: "40%", size: "3px", duration: "6.8s", delay: "4.5s" },
];

const SHEENS = [
  { duration: "14s", delay: "0s", reverse: false },
  { duration: "18s", delay: "-9s", reverse: true },
];

const GLOWS = [
  { top: "4%", left: "52%", size: "42vw", duration: "10s", delay: "0s" },
  { top: "32%", left: "-12%", size: "34vw", duration: "13s", delay: "-4s" },
  { top: "56%", left: "44%", size: "30vw", duration: "11s", delay: "-7s" },
];

/**
 * Full-bleed dark luxury atmosphere: a near-black matte base with soft,
 * slow-moving champagne/bronze gradient waves and sparse gold glints.
 * Purely decorative — pointer-events are disabled and all motion respects
 * `prefers-reduced-motion`.
 */
export function GradientWaves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("gw", className)}>
      {WAVES.map((w, i) => (
        <span
          key={`w-${i}`}
          className="gw-wave"
          style={{
            top: w.top,
            right: w.right,
            bottom: w.bottom,
            left: w.left,
            width: w.size,
            height: w.size,
            background: w.background,
            animationName: w.reverse ? "gw-drift-rev" : "gw-drift",
            animationDuration: w.duration,
            animationDelay: w.delay,
          }}
        />
      ))}
      {SPARKLES.map((s, i) => (
        <span
          key={`s-${i}`}
          className="gw-sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
      {SHEENS.map((s, i) => (
        <span
          key={`sh-${i}`}
          className="gw-sheen"
          style={{
            animationDuration: s.duration,
            animationDelay: s.delay,
            animationDirection: s.reverse ? "reverse" : "normal",
          }}
        />
      ))}
      {GLOWS.map((g, i) => (
        <span
          key={`g-${i}`}
          className="gw-glow"
          style={{
            top: g.top,
            left: g.left,
            width: g.size,
            height: g.size,
            animationDuration: g.duration,
            animationDelay: g.delay,
          }}
        />
      ))}
    </div>
  );
}
