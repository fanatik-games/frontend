import type { Metadata } from "next";
import { Jersey_25 } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

const jersey = Jersey_25({
  variable: "--font-jersey",
  weight: "400",
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
      <body className={`${jersey.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
