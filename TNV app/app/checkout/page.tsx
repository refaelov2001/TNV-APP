import { Wallet } from "lucide-react";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      icon={Wallet}
      title="קופה ותשלומים"
      description="מסך קופה מהיר עם הפקת חשבוניות ומעקב חובות — בבנייה בשלב הבא."
    />
  );
}
