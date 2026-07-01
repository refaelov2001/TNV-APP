import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "THE NEXT VERSION — ניהול מספרה",
  description: "מערכת All-in-One לניהול מלא של מספרה: תורים, לקוחות, עובדים, קופה, מלאי ושיווק.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&family=Noto+Sans+Hebrew:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg-base)]">
        <TooltipProvider delayDuration={200}>
          <Sidebar />
          <div className="flex min-h-screen flex-col lg:mr-64">
            <Topbar />
            <main className="flex-1 p-4 lg:p-6">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
