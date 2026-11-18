import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sử Đồ — Atlas lịch sử Việt Nam",
  description:
    "Khám phá Việt Nam qua từng lớp thời gian.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Cursor/accessibility browser tools may add attributes before React hydrates.
    // Tolerate attributes on these document shells only; descendants retain checks.
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
