import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALPHA PASS MASTER | AI 합격 비서",
  description: "AI가 분석한 기출문제로 가장 빠르게 자격증을 정복하세요. Alpha Family EdTech Solution.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Alpha Pass",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased dark scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#060608] text-white selection:bg-primary/30`}>
        {children}
      </body>
    </html>
  );
}
