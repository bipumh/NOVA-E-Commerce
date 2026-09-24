import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Price({
  amount,
  compareAt,
  className,
  size = "default",
}: {
  amount: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-xl",
  }[size];

  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium text-ink",
          sizeClasses,
          compareAt ? "text-clay" : "",
        )}
      >
        {formatPrice(amount)}
      </span>
      {compareAt ? (
        <span className={cn("text-muted line-through", size === "lg" ? "text-base" : "text-sm")}>
          {formatPrice(compareAt)}
        </span>
      ) : null}
    </span>
  );
}
