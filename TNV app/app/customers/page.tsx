import { Users } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Users}
      title="ניהול לקוחות"
      description="פרופיל לקוח מלא: היסטוריה, כרטיס כימיה, תשלומים והעדפות — בבנייה כמסך הבא בתהליך."
    />
  );
}
