import type { Metadata } from "next";
import { ISC_PAPERS, ISC_SEASON } from "@/lib/isc-timetable";

const title = "ISC 2027 timetable, with a countdown to every paper";
const description = `The CISCE ISC Class 12 Year 2027 timetable: all ${ISC_PAPERS.length} theory papers from ${ISC_SEASON}, with a live countdown. Pick your subjects to see only your papers. Free, no sign-in.`;

/*
  The page is a client component, so its metadata lives here. Next replaces the root layout's
  openGraph and twitter objects whole rather than merging them, so the site name and share
  images are repeated: without them a Reddit or WhatsApp link has no preview image. The
  canonical URL is its own too, since the root one points every page at the home page.
*/
export const metadata: Metadata = {
  title,
  description,
  keywords: ["ISC 2027 timetable", "ISC date sheet 2027", "ISC class 12 timetable 2027", "CISCE ISC 2027", "ISC board exam countdown"],
  alternates: { canonical: "/isc" },
  openGraph: {
    title,
    description,
    url: "/isc",
    siteName: "ICSE Boards Grind",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "ICSE Boards Grind Logo" }],
  },
  twitter: { card: "summary", title, description, images: ["/icon1.png"] },
};

export default function IscLayout({ children }: { children: React.ReactNode }) {
  return children;
}
