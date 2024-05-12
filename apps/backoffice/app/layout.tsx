"use client";

import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import ProgressBar from "@/components/ProgressBar";
import { DirectusProvider } from "@/provider/Directus";
import { AuthProvider } from "@/provider/Auth";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DirectusProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.className} overflow-hidden`}>
            <ProgressBar />
            <Toaster />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </DirectusProvider>
  );
}
