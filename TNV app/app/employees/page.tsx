import { UserCog } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={UserCog}
      title="ניהול עובדים"
      description="פרופילי עובדים, שעות עבודה, עמלות וביצועים — בבנייה בשלב הבא."
    />
  );
}
