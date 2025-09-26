import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Next-gen weather app with voice control, real-time forecasts, and offline support",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["weather", "forecast", "voice search", "PWA", "offline"],
  authors: [{ name: "Weather App Team" }],
  creator: "Weather App",
  publisher: "Weather App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://weather-app.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Weather Forecast App",
    description: "Next-gen weather app with voice control and real-time forecasts",
    url: "https://weather-app.vercel.app",
    siteName: "Weather Forecast App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Forecast App",
    description: "Next-gen weather app with voice control and real-time forecasts",
    creator: "@weatherapp",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Weather App",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0891b2" },
    { media: "(prefers-color-scheme: dark)", color: "#0891b2" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/weather-app-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Weather App" />
        <meta name="application-name" content="Weather App" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
