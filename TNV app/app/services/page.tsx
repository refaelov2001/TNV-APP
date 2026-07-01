import { Scissors } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Scissors}
      title="שירותים ומחירון"
      description="ניהול קטגוריות, מחירים ומשכי זמן לכל השירותים — בבנייה בשלב הבא."
    />
  );
}
