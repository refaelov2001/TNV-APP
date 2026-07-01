"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments, customers, employees, services } from "@/data/mock-data";
import { formatTime, getInitials } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";
import { ChevronLeft } from "lucide-react";

const statusVariant: Record<AppointmentStatus, "warning" | "info" | "accent" | "success" | "default" | "danger"> = {
  ממתין: "warning",
  אושר: "info",
  הגיע: "accent",
  הסתיים: "success",
  בוטל: "default",
  "לא הגיע": "danger",
};

export function UpcomingAppointments() {
  const now = new Date();
  const upcoming = appointments
    .filter((a) => new Date(a.start) >= now && a.status !== "בוטל")
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 6);

  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle>התורים הקרובים</CardTitle>
          <CardDescription>{upcoming.length} תורים ממתינים</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          ליומן המלא <ChevronLeft className="size-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {upcoming.map((apt) => {
          const customer = customers.find((c) => c.id === apt.customerId)!;
          const employee = employees.find((e) => e.id === apt.employeeId)!;
          const service = services.find((s) => s.id === apt.serviceIds[0])!;
          return (
            <div
              key={apt.id}
              className="flex items-center gap-3 rounded-[10px] px-2 py-2.5 transition-colors hover:bg-[var(--color-bg-card-hover)]"
            >
              <Avatar>
                <AvatarFallback style={{ background: customer.avatarColor }}>
                  {getInitials(customer.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {customer.fullName}
                </span>
                <span className="truncate text-xs text-[var(--color-text-muted)]">
                  {service.name} · {employee.fullName}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-numeric text-xs text-[var(--color-text-secondary)]">
                  {formatTime(apt.start)}
                </span>
                <Badge variant={statusVariant[apt.status]} className="text-[10px]">
                  {apt.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
