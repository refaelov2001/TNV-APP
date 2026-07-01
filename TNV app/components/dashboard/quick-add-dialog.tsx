"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { customers, employees, services } from "@/data/mock-data";

type Tab = "appointment" | "customer" | "checkout" | "message";

export function QuickAddDialog({
  open,
  onOpenChange,
  defaultTab = "appointment",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: Tab;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={open ? defaultTab : "closed"}>
        <QuickAddDialogBody defaultTab={defaultTab} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

function QuickAddDialogBody({
  defaultTab,
  onOpenChange,
}: {
  defaultTab: Tab;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [done, setDone] = useState(false);

  function handleSubmit() {
    setDone(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 1100);
  }

  return (
    <>
        {done ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center animate-fade-up">
            <CheckCircle2 className="size-12 text-[var(--color-success)]" />
            <p className="font-display text-base font-semibold text-[var(--color-text-primary)]">
              בוצע בהצלחה!
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              זוהי הדגמת ממשק — בהמשך הפעולה תישמר אוטומטית במערכת.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>פעולה מהירה</DialogTitle>
              <DialogDescription>בחר/י סוג פעולה ומלא/י את הפרטים.</DialogDescription>
            </DialogHeader>

            <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appointment">תור</TabsTrigger>
                <TabsTrigger value="customer">לקוח</TabsTrigger>
                <TabsTrigger value="checkout">קופה</TabsTrigger>
                <TabsTrigger value="message">הודעה</TabsTrigger>
              </TabsList>

              <TabsContent value="appointment" className="flex flex-col gap-3">
                <Field label="לקוח">
                  <Select defaultValue={customers[0].id}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.fullName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="שירות">
                  <Select defaultValue={services[0].id}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name} · {s.price} ₪</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="ספר/ית">
                  <Select defaultValue={employees[0].id}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {employees.filter((e) => e.role !== "קופה בלבד").map((e) => (
                        <SelectItem key={e.id} value={e.id}>{e.fullName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="תאריך"><Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></Field>
                  <Field label="שעה"><Input type="time" defaultValue="12:00" /></Field>
                </div>
              </TabsContent>

              <TabsContent value="customer" className="flex flex-col gap-3">
                <Field label="שם מלא"><Input placeholder="לדוגמה: דנה לוי" /></Field>
                <Field label="טלפון"><Input placeholder="050-0000000" /></Field>
                <Field label="תאריך לידה (אופציונלי)"><Input type="date" /></Field>
              </TabsContent>

              <TabsContent value="checkout" className="flex flex-col gap-3">
                <Field label="לקוח">
                  <Select defaultValue={customers[0].id}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.fullName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="סכום לתשלום"><Input type="number" placeholder="0" /></Field>
                <Field label="אמצעי תשלום">
                  <Select defaultValue="אשראי">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["מזומן", "אשראי", "ביט", "פייבוקס", "העברה", "אחר"].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </TabsContent>

              <TabsContent value="message" className="flex flex-col gap-3">
                <Field label="שלח אל">
                  <Select defaultValue="all">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל הלקוחות</SelectItem>
                      <SelectItem value="vip">לקוחות VIP</SelectItem>
                      <SelectItem value="inactive">לא ביקרו 60+ יום</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="תוכן ההודעה">
                  <textarea
                    className="min-h-24 w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    placeholder="כתוב/י את ההודעה כאן..."
                    defaultValue="מבצע מיוחד החודש ✂️ — קבעו תור עכשיו!"
                  />
                </Field>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>ביטול</Button>
              <Button onClick={handleSubmit}>שמור</Button>
            </DialogFooter>
          </>
        )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
