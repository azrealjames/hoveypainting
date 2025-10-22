import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { Inter, Roboto as V0_Font_Roboto } from 'next/font/google'

// Initialize fonts
const _roboto = V0_Font_Roboto({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

// Initialize Inter font with CSS variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://hoveypainting.com"),
  title: {
    default: "Hovey Painting - Professional Painting Services in Colorado",
    template: "%s | Hovey Painting",
  },
  description:
    "Family-owned and operated painting services with over 35 years of experience. Specializing in interior, exterior, residential and commercial painting services in Colorado. Free consultations available.",
  keywords: [
    "painting services",
    "house painting",
    "interior painting",
    "exterior painting",
    "commercial painting",
    "residential painting",
    "cabinet refinishing",
    "deck staining",
    "fence staining",
    "color consultation",
    "Colorado painter",
    "professional painter",
    "Brad Hovey",
    "Hovey Painting",
  ],
  authors: [{ name: "Brad Hovey" }],
  creator: "Hovey Painting",
  publisher: "Hovey Painting",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hoveypainting.com",
    siteName: "Hovey Painting",
    title: "Hovey Painting - Professional Painting Services",
    description: "Family-owned and operated painting services with over 35 years of experience in Colorado.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hovey Painting - Professional Painting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hovey Painting - Professional Painting Services",
    description: "Family-owned and operated painting services with over 35 years of experience in Colorado.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hoveypainting.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#e11d48" />
      </head>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  )
}
