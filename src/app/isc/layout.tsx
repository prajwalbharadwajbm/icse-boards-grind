import type { Metadata } from "next";
import { ISC_PAPERS } from "@/lib/isc-timetable";

const title = "ISC 2027 timetable, with a countdown to every paper";
const description = `The CISCE ISC Class 12 Year 2027 timetable: all ${ISC_PAPERS.length} theory papers from 9 February to 8 April 2027, with a live countdown. Pick your subjects to see only your papers. Free, no sign-in.`;

// The page is a client component, so its metadata lives here. Its own canonical URL: the root
// layout's canonical points every page at the home page
export const metadata: Metadata = {
  title,
  description,
  keywords: ["ISC 2027 timetable", "ISC date sheet 2027", "ISC class 12 timetable 2027", "CISCE ISC 2027", "ISC board exam countdown"],
  alternates: { canonical: "/isc" },
  openGraph: { title, description, url: "/isc" },
  twitter: { title, description },
};

export default function IscLayout({ children }: { children: React.ReactNode }) {
  return children;
}
