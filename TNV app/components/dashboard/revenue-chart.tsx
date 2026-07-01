"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { weeklyRevenue } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export function RevenueChart() {
  const data = weeklyRevenue.map((d) => ({
    date: formatDate(d.date, { weekday: "short" }),
    revenue: d.revenue,
  }));
  const total = weeklyRevenue.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle>הכנסות השבוע</CardTitle>
          <CardDescription>סה&quot;כ {formatCurrency(total)} ב-7 הימים האחרונים</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c97a3d" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#c97a3d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e281f" vertical={false} />
              <XAxis dataKey="date" stroke="#8a8070" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8a8070" fontSize={11} tickLine={false} axisLine={false} width={50} />
              <Tooltip
                contentStyle={{
                  background: "#2a2419",
                  border: "1px solid #3d3527",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#f4eee1",
                }}
                formatter={(value) => [formatCurrency(Number(value)), "הכנסה"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c97a3d" strokeWidth={2.5} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
