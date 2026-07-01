import { Megaphone } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Megaphone}
      title="שיווק ואוטומציות"
      description="תבניות הודעות, פילוח לקוחות וקמפיינים אוטומטיים — בבנייה בשלב הבא."
    />
  );
}
