import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]",
        accent: "bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]",
        success: "bg-[var(--color-success-dim)] text-[var(--color-success)]",
        warning: "bg-[var(--color-warning-dim)] text-[var(--color-warning)]",
        danger: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
        info: "bg-[var(--color-info-dim)] text-[var(--color-info)]",
        outline: "border border-[var(--color-border-strong)] text-[var(--color-text-secondary)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
