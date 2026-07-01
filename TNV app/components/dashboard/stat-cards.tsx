"use client";

import { CalendarCheck2, Banknote, UserPlus2, XCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: React.ReactNode;
  accent: string;
}

function StatCard({ label, value, delta, icon, accent }: StatCardProps) {
  return (
    <Card className="animate-fade-up transition-colors hover:bg-[var(--color-bg-card-hover)]">
      <CardContent className="flex items-start justify-between p-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
          <span className="font-numeric font-display text-2xl font-bold text-[var(--color-text-primary)]">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                delta.positive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
              )}
            >
              {delta.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {delta.value}
            </span>
          )}
        </div>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px]"
          style={{ background: `${accent}22`, color: accent }}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCardsRow({
  todayCount,
  todayRevenue,
  newCustomers,
  cancelledOrNoShow,
}: {
  todayCount: number;
  todayRevenue: number;
  newCustomers: number;
  cancelledOrNoShow: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="תורים היום"
        value={String(todayCount)}
        delta={{ value: "+12% משבוע שעבר", positive: true }}
        icon={<CalendarCheck2 className="size-5" />}
        accent="#c97a3d"
      />
      <StatCard
        label="הכנסות היום (עד כה)"
        value={formatCurrency(todayRevenue)}
        delta={{ value: "+8% מהממוצע", positive: true }}
        icon={<Banknote className="size-5" />}
        accent="#6fa37a"
      />
      <StatCard
        label="לקוחות חדשים"
        value={String(newCustomers)}
        delta={{ value: "יציב", positive: true }}
        icon={<UserPlus2 className="size-5" />}
        accent="#6b8fa3"
      />
      <StatCard
        label="ביטולים ואי-הגעה"
        value={String(cancelledOrNoShow)}
        delta={{ value: "-2 מאתמול", positive: true }}
        icon={<XCircle className="size-5" />}
        accent="#c2564f"
      />
    </div>
  );
}
