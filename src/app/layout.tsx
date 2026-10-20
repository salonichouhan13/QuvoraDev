import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quvora.dev";
const description =
  "Quvora is a freelance software studio building modern, reliable and scalable websites, web apps and software for growing businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quvora | Websites, Apps & Software That Help Businesses Grow",
    template: "%s | Quvora",
  },
  description,
  keywords: ["web development", "web app development", "UI/UX design", "API development", "SEO", "freelance developer India"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Quvora",
    title: "Quvora | Websites, Apps & Software That Help Businesses Grow",
    description,
  },
  twitter: { card: "summary_large_image", title: "Quvora", description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#130e0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
