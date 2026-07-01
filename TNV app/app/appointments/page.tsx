import { ClipboardList } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={ClipboardList}
      title="ניהול תורים"
      description="תצוגת רשימה לכל התורים עם סינון וחיפוש מתקדם — בבנייה בשלב הבא."
    />
  );
}
