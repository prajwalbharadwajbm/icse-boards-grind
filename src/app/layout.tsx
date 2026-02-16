import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { PostHogProvider } from "@/providers/posthog-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Providers } from "@/providers/heroui-provider";
import { PostHogPageview } from "@/components/posthog-pageview";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "ICSE Boards Grind — Your 2026 Board Exam Study Dashboard",
    template: "%s | ICSE Boards Grind",
  },
  description: "Free ICSE 2026 board exam study planner with AI coach, study timer, progress tracking, revision scheduler, and smart timetable. Plan, track, and grind smarter.",
  keywords: [
    "ICSE board exam 2026",
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
    title: "ICSE Boards Grind — Your 2026 Board Exam Study Dashboard",
    description: "Free ICSE 2026 board exam study planner with AI coach, study timer, progress tracking, and smart timetable.",
    siteName: "ICSE Boards Grind",
    type: "website",
    images: [
      {
        url: "/icon0.svg",
        width: 512,
        height: 512,
        alt: "ICSE Boards Grind Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ICSE Boards Grind — Study Dashboard for ICSE 2026",
    description: "Free ICSE 2026 board exam study planner with AI coach, study timer, and progress tracking.",
    images: ["/icon1.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
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
        <meta name="theme-color" content="#0d1117" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Boards Grind" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
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
