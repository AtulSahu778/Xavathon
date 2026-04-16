import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xavathon.vercel.app"),
  title: "Xavathon | Premium College Hackathon",
  description:
    "Xavathon is a premium, modern college hackathon experience featuring prizes, certificates, collaboration with IQAC and XTS, and registration powered by Google Sheets.",
  keywords: [
    "Xavathon",
    "college hackathon",
    "student hackathon",
    "IQAC",
    "XTS",
    "computer science department",
  ],
  icons: {
    icon: "/Xavathon.png",
    shortcut: "/Xavathon.png",
    apple: "/Xavathon.png",
  },
  openGraph: {
    title: "Xavathon | Premium College Hackathon",
    description:
      "Build, compete, and showcase bold ideas at Xavathon, a premium futuristic hackathon experience for student innovators.",
    type: "website",
    url: "https://xavathon.vercel.app",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xavathon Open Graph Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xavathon | Premium College Hackathon",
    description:
      "A premium futuristic landing page for a college hackathon with registration, prizes, and event details.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0b] text-[#f5f5f5]">{children}</body>
    </html>
  );
}
