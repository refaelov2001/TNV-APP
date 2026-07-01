"use client";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "לילה טוב";
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
}

export function GreetingHeader({ name }: { name: string }) {
  const dateStr = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="mb-6 flex flex-col gap-1 animate-fade-up">
      <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] lg:text-3xl">
        {getGreeting()}, {name} ✂️
      </h1>
      <p className="text-sm text-[var(--color-text-muted)]">היום {dateStr} — הנה מה שקורה היום ב-THE NEXT VERSION</p>
    </div>
  );
}
