"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  UserCog,
  Scissors,
  Wallet,
  Package,
  Megaphone,
  BarChart3,
  Globe,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { businessSettings } from "@/data/mock-data";

const navItems = [
  { href: "/", label: "דשבורד", icon: LayoutDashboard },
  { href: "/calendar", label: "יומן", icon: CalendarDays },
  { href: "/customers", label: "לקוחות", icon: Users },
  { href: "/appointments", label: "תורים", icon: ClipboardList },
  { href: "/employees", label: "עובדים", icon: UserCog },
  { href: "/services", label: "שירותים", icon: Scissors },
  { href: "/checkout", label: "קופה", icon: Wallet },
  { href: "/inventory", label: "מלאי", icon: Package },
  { href: "/marketing", label: "שיווק", icon: Megaphone },
  { href: "/reports", label: "דוחות", icon: BarChart3 },
  { href: "/booking", label: "הזמנות אונליין", icon: Globe },
  { href: "/settings", label: "הגדרות", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] font-display text-base font-bold text-[#1a1006]">
          {businessSettings.logoInitial}
        </div>
        <span className="font-display text-sm font-bold text-[var(--color-text-primary)]">THE NEXT VERSION</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium",
                    active
                      ? "bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)]"
                  )}
                >
                  <Icon className="size-[18px]" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
