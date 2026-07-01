import { CalendarDays } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={CalendarDays}
      title="יומן תורים חכם"
      description="תצוגת יום / שבוע / חודש, גרירת תורים, חסימת זמנים ועוד — בבנייה כמסך הבא בתהליך."
    />
  );
}
