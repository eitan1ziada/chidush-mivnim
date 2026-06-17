import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "חידוש מבנים | שיפוץ ובנייה פרימיום",
  description: "חברת חידוש מבנים — מובילים בתחום השיפוץ והבנייה. איכות, מקצועיות וחדשנות בכל פרויקט.",
  keywords: ["חידוש מבנים", "שיפוץ", "בנייה", "קבלן", "פרימיום"],
  openGraph: {
    title: "חידוש מבנים | שיפוץ ובנייה פרימיום",
    description: "מובילים בתחום השיפוץ והבנייה. איכות, מקצועיות וחדשנות בכל פרויקט.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" className={`${jakarta.variable} ${manrope.variable}`}>
      <body className="noise-bg min-h-screen">{children}</body>
    </html>
  );
}
