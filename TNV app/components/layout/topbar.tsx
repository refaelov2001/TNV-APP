"use client";

import { useState } from "react";
import { Search, Bell, Menu, Plus, UserPlus, Wallet, MessageCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { MobileNav } from "@/components/layout/mobile-nav";
import { QuickAddDialog } from "@/components/dashboard/quick-add-dialog";

export function Topbar() {
  const [search, setSearch] = useState("");
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickAddTab, setQuickAddTab] = useState<"appointment" | "customer" | "checkout" | "message">("appointment");

  function openQuickAdd(tab: typeof quickAddTab) {
    setQuickAddTab(tab);
    setQuickAddOpen(true);
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]/85 px-4 backdrop-blur lg:px-6">
      {/* תפריט מובייל */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="sr-only">תפריט ניווט</SheetTitle>
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* חיפוש גלובלי */}
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש לקוח, תור, שירות או מוצר..."
          className="pr-9"
        />
      </div>

      <div className="mr-auto flex items-center gap-2">
        {/* פעולות מהירות */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="hidden sm:inline-flex">
              <Plus className="size-4" />
              פעולה מהירה
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>פעולות מהירות</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => openQuickAdd("appointment")}>
              <Plus className="size-4 text-[var(--color-accent)]" /> הוסף תור
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openQuickAdd("customer")}>
              <UserPlus className="size-4 text-[var(--color-info)]" /> הוסף לקוח
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openQuickAdd("checkout")}>
              <Wallet className="size-4 text-[var(--color-success)]" /> פתח קופה
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openQuickAdd("message")}>
              <MessageCircle className="size-4 text-[var(--color-gold)]" /> שלח הודעה
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openQuickAdd("message")}>
              <Megaphone className="size-4 text-[var(--color-accent)]" /> צור מבצע
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="icon" variant="ghost" className="relative" onClick={() => openQuickAdd("appointment")}>
          <Plus className="size-5 sm:hidden" />
        </Button>

        {/* התראות */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-[18px]" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--color-danger)] animate-pulse-glow" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>התראות חשובות</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <NotificationRow text="מלאי נמוך: סרום אנטי-פריז (3 יח׳ נותרו)" tone="warning" />
            <NotificationRow text="ליה מזרחי (VIP) מגיעה היום ב-12:00" tone="accent" />
            <NotificationRow text="מאיה גולן לא הגיעה לתור הקודם" tone="danger" />
            <NotificationRow text="טל פרידמן — חוב פתוח של 120 ₪" tone="warning" />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* פרופיל */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-[var(--color-bg-card-hover)]">
              <Avatar className="size-8">
                <AvatarFallback style={{ background: "#c97a3d" }}>אכ</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>איתי כהן · בעלים</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>הגדרות חשבון</DropdownMenuItem>
            <DropdownMenuItem>תמיכה</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>התנתקות</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <QuickAddDialog open={quickAddOpen} onOpenChange={setQuickAddOpen} defaultTab={quickAddTab} />
    </header>
  );
}

function NotificationRow({
  text,
  tone,
}: {
  text: string;
  tone: "warning" | "accent" | "danger";
}) {
  return (
    <DropdownMenuItem className="items-start gap-2.5 py-2.5">
      <Badge variant={tone} dot className="mt-0.5 px-1.5 py-1" />
      <span className="whitespace-normal text-xs leading-relaxed text-[var(--color-text-secondary)]">{text}</span>
    </DropdownMenuItem>
  );
}
