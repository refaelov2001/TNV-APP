"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle, Star, UserX, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    icon: AlertTriangle,
    text: "מלאי נמוך: סרום אנטי-פריז ומסכת שיער שיקומית",
    tone: "warning" as const,
  },
  {
    icon: Star,
    text: "ליה מזרחי (VIP) מגיעה היום ב-12:00",
    tone: "accent" as const,
  },
  {
    icon: UserX,
    text: "מאיה גולן לא הגיעה לתור הקודם שלה",
    tone: "danger" as const,
  },
  {
    icon: Wallet,
    text: "טל פרידמן — תשלום פתוח על סך 120 ₪",
    tone: "warning" as const,
  },
];

const toneStyles = {
  warning: "bg-[var(--color-warning-dim)] text-[var(--color-warning)]",
  danger: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
  accent: "bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]",
};

export function AlertsCard() {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>התראות חשובות</CardTitle>
        <CardDescription>דברים שכדאי לשים לב אליהם היום</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-[10px] border border-[var(--color-border)] p-3 transition-colors hover:bg-[var(--color-bg-card-hover)]"
            >
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-[8px]", toneStyles[alert.tone])}>
                <Icon className="size-4" />
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">{alert.text}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
