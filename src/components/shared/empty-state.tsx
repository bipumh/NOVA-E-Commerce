import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <Container
      className={cn(
        "flex min-h-[50vh] flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-muted">
        <Icon aria-hidden className="h-7 w-7" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-medium text-ink">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action ? (
        <Button href={action.href} className="mt-8">
          {action.label}
        </Button>
      ) : null}
    </Container>
  );
}
