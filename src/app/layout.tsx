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

export const viewport = {
  themeColor: "#0a0a0a",
};

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Iftar Countdown - ${params.city || "Your Location"}`,
    description: `Find out the exact Iftar time in ${params.city || "your area"} and never miss a moment of Ramadan.`,
    metadataBase: new URL("https://iftar-countdown.vercel.app"),
    authors: [{ name: "Iftar Countdown App" }],
    keywords: ["iftar", "ramadan", "countdown", "prayer times", "fasting"],
    openGraph: {
      title: "Iftar Countdown",
      description: "Know exactly when to break your fast based on your location",
      url: "https://iftar-countdown.vercel.app",
      siteName: "Iftar Countdown",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Iftar Countdown App Preview",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Iftar Countdown",
      description: "Know exactly when to break your fast based on your location",
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={typeof navigator !== "undefined" ? navigator.language : "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
