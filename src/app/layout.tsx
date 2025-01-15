import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fanatix - Compete & Win Real Money | Fantasy Leagues & Predictions",
  description:
    "Looking to monetize your sports expertise? Our platform lets you compete in prediction challenges, win real money, and connect with fellow sports fans in an engaging community⁠",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
