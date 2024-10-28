import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import LayoutProvider from "@/components/providers/layout-provider";
import { SessionProvider } from "next-auth/react";
import UserDataProvider from "@/components/providers/user-data-provider";
import { Suspense } from "react";
import TopLoader from "@/components/loaders/Top-Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin - Rotaract Galgotias",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SessionProvider>
            <UserDataProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                // forcedTheme="dark"
                disableTransitionOnChange
              >
                <TopLoader />
                <LayoutProvider>{children}</LayoutProvider>
                <Toaster />
              </ThemeProvider>
            </UserDataProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
