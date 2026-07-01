import { GreetingHeader } from "@/components/dashboard/greeting-header";
import { StatCardsRow } from "@/components/dashboard/stat-cards";
import { TodayTimeline } from "@/components/dashboard/today-timeline";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { AlertsCard } from "@/components/dashboard/alerts-card";
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card";
import { AiInsightsCard } from "@/components/dashboard/ai-insights-card";
import { appointments, customers, payments } from "@/data/mock-data";
import { businessSettings } from "@/data/mock-data";

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function DashboardPage() {
  const todaysAppointments = appointments.filter((a) => isToday(a.start) && a.status !== "בוטל");
  const todayRevenue = payments
    .filter((p) => isToday(p.date) && p.status === "שולם")
    .reduce((sum, p) => sum + p.amount + (p.tip ?? 0) - (p.discount ?? 0), 0);
  const newCustomers = customers.filter((c) => c.status === "חדש").length;
  const cancelledOrNoShow = appointments.filter(
    (a) => isToday(a.start) && (a.status === "בוטל" || a.status === "לא הגיע")
  ).length;

  const ownerFirstName = businessSettings.name === "THE NEXT VERSION" ? "איתי" : "";

  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <GreetingHeader name={ownerFirstName} />

      <div className="flex flex-col gap-5">
        <StatCardsRow
          todayCount={todaysAppointments.length}
          todayRevenue={todayRevenue}
          newCustomers={newCustomers}
          cancelledOrNoShow={cancelledOrNoShow}
        />

        <TodayTimeline />

        <QuickActionsCard />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <AlertsCard />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <UpcomingAppointments />
          </div>
          <AiInsightsCard />
        </div>
      </div>
    </div>
  );
}
