import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ComingSoon({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-[16px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-6 py-16 text-center animate-fade-up">
        <div className="flex size-16 items-center justify-center rounded-[16px] bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]">
          <Icon className="size-7" />
        </div>
        <h1 className="font-display text-xl font-bold text-[var(--color-text-primary)]">{title}</h1>
        <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        <Badge variant="accent" className="mt-2">בבנייה — בשלב הבא</Badge>
      </div>
    </div>
  );
}
