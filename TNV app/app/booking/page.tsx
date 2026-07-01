import { Globe } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Globe}
      title="הזמנות אונליין"
      description="דף עסק ציבורי שבו לקוחות קובעים תור בעצמם — בבנייה בשלב הבא."
    />
  );
}
