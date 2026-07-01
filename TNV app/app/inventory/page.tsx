import { Package } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Package}
      title="מלאי ומוצרים"
      description="ניהול מלאי, התראות מלאי נמוך והזמנות מספקים — בבנייה בשלב הבא."
    />
  );
}
