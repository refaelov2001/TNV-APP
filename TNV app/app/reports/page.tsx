import { BarChart3 } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={BarChart3}
      title="דוחות וניתוח עסקי"
      description="דוחות הכנסות, ביצועים ותחזיות עם המלצות AI — בבנייה בשלב הבא."
    />
  );
}
