"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarPlus, UserPlus, Wallet, MessageCircle, Megaphone } from "lucide-react";
import { QuickAddDialog } from "@/components/dashboard/quick-add-dialog";

const actions = [
  { key: "appointment" as const, label: "הוסף תור", icon: CalendarPlus, color: "#c97a3d" },
  { key: "customer" as const, label: "הוסף לקוח", icon: UserPlus, color: "#6b8fa3" },
  { key: "checkout" as const, label: "קופה", icon: Wallet, color: "#6fa37a" },
  { key: "message" as const, label: "שלח הודעה", icon: MessageCircle, color: "#d9a84e" },
  { key: "message" as const, label: "צור מבצע", icon: Megaphone, color: "#c97a3d" },
];

export function QuickActionsCard() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"appointment" | "customer" | "checkout" | "message">("appointment");

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>פעולות מהירות</CardTitle>
        <CardDescription>הדברים שאתם עושים הכי הרבה, בלחיצה אחת</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              onClick={() => {
                setTab(action.key);
                setOpen(true);
              }}
              className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-bg-card-hover)]"
            >
              <div
                className="flex size-9 items-center justify-center rounded-[10px]"
                style={{ background: `${action.color}22`, color: action.color }}
              >
                <Icon className="size-[18px]" />
              </div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">{action.label}</span>
            </button>
          );
        })}
      </CardContent>
      <QuickAddDialog open={open} onOpenChange={setOpen} defaultTab={tab} />
    </Card>
  );
}
