import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "WeatherFlow",
  description: "WeatherFlow is a minimal, beautiful weather companion with hourly and daily forecasts, favorites, and offline access.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["weather", "forecast", "PWA", "offline"],
  authors: [{ name: "WeatherFlow" }],
  creator: "WeatherFlow",
  publisher: "WeatherFlow",
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
    title: "WeatherFlow",
    description: "A minimal, beautiful weather companion with hourly and daily forecasts, favorites, and offline access.",
    url: "https://weather-app.vercel.app",
    siteName: "WeatherFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherFlow",
    description: "A minimal, beautiful weather companion with hourly and daily forecasts, favorites, and offline access.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WeatherFlow",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1420" },
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WeatherFlow" />
        <meta name="application-name" content="WeatherFlow" />
        <meta name="msapplication-TileColor" content="#0b52ae" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
