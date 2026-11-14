import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { PostHogProvider } from "@/providers/posthog-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Providers } from "@/providers/heroui-provider";
import { PostHogPageview } from "@/components/posthog-pageview";
import { Suspense } from "react";
import { EXAM_YEAR } from "@/lib/constants";

// Sticker brand: Bricolage Grotesque for display, DM Sans for reading, Newsreader for literary quotes
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"] });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", weight: ["400", "500"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: {
    default: `ICSE Boards Grind — Study planner for ICSE ${EXAM_YEAR}`,
    template: "%s | ICSE Boards Grind",
  },
  description: `Free ICSE ${EXAM_YEAR} board exam study planner with the official CISCE timetable, a countdown to every paper, study timer, revision scheduler, progress tracking and an AI coach.`,
  keywords: [
    `ICSE board exam ${EXAM_YEAR}`,
    `ICSE ${EXAM_YEAR} timetable`,
    "ICSE study planner",
    "board exam preparation",
    "study timer",
    "ICSE revision tracker",
    "exam countdown",
    "study dashboard",
    "ICSE class 10",
    "board exam timetable",
    "study streak tracker",
  ],
  metadataBase: new URL("https://icse-boards-grind.vercel.app"),
  openGraph: {
    title: `ICSE Boards Grind — Study planner for ICSE ${EXAM_YEAR}`,
    description: `Free ICSE ${EXAM_YEAR} study planner with the official timetable, a countdown to every paper, study timer and progress tracking.`,
    siteName: "ICSE Boards Grind",
    type: "website",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "ICSE Boards Grind Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `ICSE Boards Grind — Study planner for ICSE ${EXAM_YEAR}`,
    description: `Free ICSE ${EXAM_YEAR} study planner with the official timetable, study timer and progress tracking.`,
    images: ["/icon1.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://icse-boards-grind.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Boards Grind" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-adsense-account" content="ca-pub-9077222671653004" />
      </head>
      <body className={`${bricolage.variable} ${dmSans.variable} ${newsreader.variable} font-sans antialiased`}>
        <AuthProvider>
          <PostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageview />
            </Suspense>
            <ThemeProvider>
              <Providers>
                {children}
              </Providers>
            </ThemeProvider>
          </PostHogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
