"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { appointments, customers, employees, services } from "@/data/mock-data";
import type { Appointment, AppointmentStatus } from "@/types";
import { cn, formatTime } from "@/lib/utils";

const DAY_START_HOUR = 9;
const DAY_END_HOUR = 20;
const TOTAL_MINUTES = (DAY_END_HOUR - DAY_START_HOUR) * 60;

const statusColor: Record<AppointmentStatus, string> = {
  ממתין: "var(--color-warning)",
  אושר: "var(--color-info)",
  הגיע: "var(--color-accent-light)",
  הסתיים: "var(--color-success)",
  בוטל: "var(--color-text-muted)",
  "לא הגיע": "var(--color-danger)",
};

function minutesSinceDayStart(iso: string): number {
  const d = new Date(iso);
  return (d.getHours() - DAY_START_HOUR) * 60 + d.getMinutes();
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function TodayTimeline() {
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      setNowMinutes((now.getHours() - DAY_START_HOUR) * 60 + now.getMinutes());
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const todays = appointments
    .filter((a) => isToday(a.start) && a.status !== "בוטל")
    .sort((a, b) => a.start.localeCompare(b.start));

  const hourMarks = Array.from({ length: DAY_END_HOUR - DAY_START_HOUR + 1 }, (_, i) => DAY_START_HOUR + i);
  const nowVisible = nowMinutes !== null && nowMinutes >= 0 && nowMinutes <= TOTAL_MINUTES;

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>מסלול היום</CardTitle>
        <CardDescription>תצוגה חיה של כל התורים היום, ביחס לשעה הנוכחית</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pt-2">
          {/* ציר שעות */}
          <div className="relative mb-3 flex h-5 text-[10px] text-[var(--color-text-muted)] font-numeric">
            {hourMarks.map((h) => (
              <span
                key={h}
                className="absolute -translate-x-1/2"
                style={{ right: `${((h - DAY_START_HOUR) / (DAY_END_HOUR - DAY_START_HOUR)) * 100}%` }}
              >
                {h}:00
              </span>
            ))}
          </div>

          {/* המסלול עצמו */}
          <div className="relative h-16 rounded-[12px] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
            {/* קווי שעה */}
            {hourMarks.map((h) => (
              <div
                key={h}
                className="absolute top-0 h-full w-px bg-[var(--color-border)]"
                style={{ right: `${((h - DAY_START_HOUR) / (DAY_END_HOUR - DAY_START_HOUR)) * 100}%` }}
              />
            ))}

            {/* בלוקים של תורים */}
            {todays.map((apt) => (
              <AppointmentBlock key={apt.id} appointment={apt} />
            ))}

            {/* אינדיקטור "עכשיו" */}
            {nowVisible && (
              <div
                className="absolute top-0 z-10 h-full"
                style={{ right: `${((nowMinutes! / TOTAL_MINUTES) * 100).toFixed(2)}%` }}
              >
                <div className="absolute top-[-6px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] size-3 animate-pulse-glow" />
                <div className="h-full w-px bg-[var(--color-accent)]" />
              </div>
            )}
          </div>

          {/* לג'נדה */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
            {(Object.keys(statusColor) as AppointmentStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                <span className="size-2 rounded-full" style={{ background: statusColor[s] }} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentBlock({ appointment }: { appointment: Appointment }) {
  const start = minutesSinceDayStart(appointment.start);
  const end = minutesSinceDayStart(appointment.end);
  const widthPct = Math.max(((end - start) / TOTAL_MINUTES) * 100, 1.5);
  const rightPct = (start / TOTAL_MINUTES) * 100;

  const customer = customers.find((c) => c.id === appointment.customerId);
  const employee = employees.find((e) => e.id === appointment.employeeId);
  const service = services.find((s) => s.id === appointment.serviceIds[0]);
  const color = statusColor[appointment.status];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "absolute top-2 h-12 cursor-pointer rounded-[8px] border transition-transform hover:-translate-y-0.5 hover:z-20"
          )}
          style={{
            right: `${rightPct}%`,
            width: `${widthPct}%`,
            background: `${color}26`,
            borderColor: `${color}66`,
          }}
        >
          <div
            className="h-full w-1 rounded-r-[8px]"
            style={{ background: color, position: "absolute", right: 0, top: 0 }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{customer?.fullName}</span>
          <span className="text-[var(--color-text-muted)]">
            {service?.name} · {employee?.fullName}
          </span>
          <span className="font-numeric text-[var(--color-text-muted)]">
            {formatTime(appointment.start)}–{formatTime(appointment.end)}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
