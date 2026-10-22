import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import { Providers } from "@/components/providers";
import "./globals.css";

const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: `${portfolio.shortName} — ${portfolio.role}`,
  description: portfolio.description,
  applicationName: `${portfolio.shortName} Portfolio`,
  authors: [{ name: portfolio.name }],
  alternates: { canonical: "/" },
  keywords: [portfolio.name, "Web developer", "WordPress developer", "WooCommerce", "React", "Dhaka"],
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: portfolio.shortName, title: `${portfolio.shortName} — ${portfolio.role}`, description: portfolio.description },
  twitter: { card: "summary_large_image", title: portfolio.shortName, description: portfolio.description },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#11130f" }, { media: "(prefers-color-scheme: light)", color: "#f5f5ef" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${body.variable} ${display.variable} ${serif.variable}`}><body><Providers>{children}</Providers></body></html>;
}
