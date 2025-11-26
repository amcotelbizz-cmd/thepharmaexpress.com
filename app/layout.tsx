import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingPhone } from "@/components/floating-phone"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { QuickViewProvider } from "@/lib/quick-view-context"
import GoogleAnalytics from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "thepharmaexpress - Premium ED Medications & Health Solutions Online",
    template: "%s | thepharmaexpress"
  },
  description: "Buy premium erectile dysfunction medications online. FDA-approved Sildenafil, Tadalafil, and Vardenafil at affordable prices. Fast, discreet shipping with doctor consultation.",
  keywords: [
    "erectile dysfunction",
    "ED medication",
    "sildenafil",
    "tadalafil", 
    "vardenafil",
    "online pharmacy",
    "prescription medicine",
    "men's health",
    "sexual health",
    "FDA approved",
    "doctor consultation",
    "discreet shipping"
  ],
  authors: [{ name: "thepharmaexpress Healthcare" }],
  creator: "thepharmaexpress",
  publisher: "thepharmaexpress Healthcare",
  generator: 'Next.js',
  applicationName: "thepharmaexpress",
  referrer: "origin-when-cross-origin",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thepharmaexpress.com",
    siteName: "thepharmaexpress",
    title: "thepharmaexpress - Premium ED Medications & Health Solutions Online",
    description: "Buy premium erectile dysfunction medications online. FDA-approved Sildenafil, Tadalafil, and Vardenafil at affordable prices. Fast, discreet shipping with doctor consultation.",
    images: [
      {
        url: "/images/thepharmaexpress-logo.png",
        width: 1200,
        height: 630,
        alt: "thepharmaexpress - Premium ED Medications Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thepharmaexpress",
    creator: "@thepharmaexpress",
    title: "thepharmaexpress - Premium ED Medications & Health Solutions Online",
    description: "Buy premium erectile dysfunction medications online. FDA-approved medications with doctor consultation and discreet shipping.",
    images: ["/images/thepharmaexpress-logo.png"],
  },
  alternates: {
    canonical: "https://thepharmaexpress.com",
  },
  icons: {
    icon: [
      {
        url: '/images/thepharmaexpress-favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/thepharmaexpress-favicon.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/images/thepharmaexpress-favicon.png',
    apple: [
      {
        url: '/images/thepharmaexpress-favicon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://thepharmaexpress.com" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "thepharmaexpress",
              "url": "https://thepharmaexpress.com",
              "logo": "https://thepharmaexpress.com/images/thepharmaexpress-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-999-999-9999",
                "email": "sales@thepharmaexpress.com",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ABC_ADDRESS_LINE",
                "addressLocality": "Burbank",
                "addressRegion": "CA",
                "postalCode": "91506",
                "addressCountry": "US"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "thepharmaexpress",
              "url": "https://thepharmaexpress.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://thepharmaexpress.com/products?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <CartProvider>
          <QuickViewProvider>
            <div className="relative min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <FloatingPhone />
              <Toaster />
            </div>
          </QuickViewProvider>
        </CartProvider>
      </body>
    </html>
  )
}
