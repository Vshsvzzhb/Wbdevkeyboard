import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WpDev Keyboard — Engineered Clarity",
  description:
    "WpDev crafts premium mechanical keyboards engineered for precision and clarity. Discover the layers of engineering behind every keystroke.",
  keywords: ["mechanical keyboard", "WpDev", "premium keyboard", "engineering", "precision"],
  openGraph: {
    title: "WpDev Keyboard — Engineered Clarity",
    description: "Premium mechanical keyboards engineered for precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
