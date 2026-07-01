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
  Sparkles,
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col border-l border-[var(--color-border)] bg-[var(--color-bg-surface)] lg:flex">
      {/* לוגו */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] font-display text-lg font-bold text-[#1a1006] shadow-[0_4px_16px_-4px_rgba(201,122,61,0.6)]">
          {businessSettings.logoInitial}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-bold tracking-wide text-[var(--color-text-primary)]">
            THE NEXT VERSION
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]">ניהול מספרה</span>
        </div>
      </div>

      <Separator />

      {/* ניווט */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0",
                      active ? "text-[var(--color-accent-light)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]"
                    )}
                  />
                  <span>{item.label}</span>
                  {active && <span className="mr-auto size-1.5 rounded-full bg-[var(--color-accent-light)]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      {/* קידום AI */}
      <div className="m-3 rounded-[12px] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-card)] p-4">
        <div className="mb-1.5 flex items-center gap-2 text-[var(--color-gold)]">
          <Sparkles className="size-4" />
          <span className="text-xs font-semibold">תובנת AI חדשה</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          זוהתה ירידה בתורים בימי שלישי. לחצו על &quot;דוחות&quot; לפרטים והמלצות.
        </p>
      </div>
    </aside>
  );
}

function Separator() {
  return <div className="h-px w-full bg-[var(--color-border)]" />;
}
