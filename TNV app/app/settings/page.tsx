import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Settings}
      title="הגדרות עסק"
      description="פרטי עסק, מיתוג, מדיניות ביטולים וחיבורים — בבנייה בשלב הבא."
    />
  );
}
