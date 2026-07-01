"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { aiInsights } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const typeIcon = {
  הזדמנות: Lightbulb,
  אזהרה: AlertTriangle,
  מגמה: TrendingUp,
};

const typeStyle = {
  הזדמנות: "bg-[var(--color-success-dim)] text-[var(--color-success)]",
  אזהרה: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
  מגמה: "bg-[var(--color-info-dim)] text-[var(--color-info)]",
};

export function AiInsightsCard() {
  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <Sparkles className="size-[18px] text-[var(--color-gold)]" />
        <div className="flex flex-col gap-1">
          <CardTitle>המלצות AI לשיפור העסק</CardTitle>
          <CardDescription>תובנות שנגזרות מהנתונים שלכם באופן אוטומטי</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {aiInsights.map((insight) => {
          const Icon = typeIcon[insight.type];
          return (
            <div
              key={insight.id}
              className="flex items-start gap-3 rounded-[10px] border border-[var(--color-border)] p-3"
            >
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-[8px]", typeStyle[insight.type])}>
                <Icon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{insight.title}</span>
                <span className="text-xs leading-relaxed text-[var(--color-text-muted)]">{insight.description}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
