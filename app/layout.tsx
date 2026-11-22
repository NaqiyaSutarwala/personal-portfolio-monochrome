import type { Metadata, Viewport } from "next";
import { Funnel_Display } from "next/font/google";

import { NAV_LINKS, PERSONAL_INFO } from "@/constants/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const funnel = Funnel_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font",
});

export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.bio,
  keywords: [
    "MERN Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Full Stack Developer",
    "Ahmedabad",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.linkedin }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    type: "website",
    locale: "en_IN",
    siteName: `${PERSONAL_INFO.name} Portfolio`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={funnel.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Navbar name={PERSONAL_INFO.name} links={NAV_LINKS} />
        {children}
      </body>
    </html>
  );
}
