import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Rating({
  value,
  count,
  className,
  showValue = true,
}: {
  value: number;
  count?: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span className="flex items-center" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = value >= i - 0.25;
          const half = value >= i - 0.75 && value < i - 0.25;
          return (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                filled ? "fill-clay text-clay" : half ? "fill-clay/40 text-clay/40" : "text-line-strong",
              )}
            />
          );
        })}
      </span>
      {showValue ? (
        <span className="text-xs text-dim">
          {value.toFixed(1)}
          {count ? ` (${count})` : ""}
        </span>
      ) : null}
    </span>
  );
}
