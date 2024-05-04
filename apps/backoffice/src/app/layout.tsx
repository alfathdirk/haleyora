'use client';

import '@/styles/globals.scss'
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { deleteCookie } from 'cookies-next';
import { AuthProvider } from '@/provider/Auth';
import { DirectusProvider } from '@/provider/Directus';
import '@/styles/tailwind.css'

import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DirectusProvider>
      <AuthProvider>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
            suppressHydrationWarning={true}
          >
            <ProgressBar />
            {children}
          </body>
        </html>
      </AuthProvider>
    </DirectusProvider>
  )
}
