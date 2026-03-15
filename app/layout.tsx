import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PunchyAI — Communication Coach for Investment Professionals",
  description:
    "Train to pitch more fluently, concisely, and with impact across high-stakes investment scenarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
