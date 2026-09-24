import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  className,
  children,
  containerClassName,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
