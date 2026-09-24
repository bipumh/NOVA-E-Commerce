import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-clay text-charcoal shadow-soft hover:bg-clay-dark hover:shadow-lift",
        outline:
          "border border-clay/30 bg-transparent text-ink hover:border-clay hover:text-clay hover:bg-clay/10",
        ghost: "bg-transparent text-muted hover:text-ink hover:bg-surface-2",
        soft: "bg-primary-soft text-clay hover:bg-clay/20",
        light:
          "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/10",
        white: "bg-ink text-charcoal hover:bg-surface-2",
        danger: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        default: "h-12 px-7 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: () => void;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant, size, className, children, ariaLabel } = props;

  const classes = cn(buttonVariants({ variant, size }), className);

  if (props.href) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
