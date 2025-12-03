import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartDrawer from "@/components/CartDrawer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "LactoClear® - Clearing the Path for Peak Recovery",
    template: "%s | LactoClear®",
  },
  description: "Breaking the lactate barrier and restoring metabolic balance. Advanced two-step protocol for mitochondrial support and metabolic recovery.",
  keywords: [
    "lactate clearance",
    "mitochondrial support",
    "metabolic recovery",
    "lactoclear",
    "mitofuel",
    "health supplements",
    "recovery protocol",
    "nasal spray delivery"
  ],
  authors: [{ name: "LactoClear®" }],
  creator: "LactoClear®",
  publisher: "LactoClear®",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "LactoClear®",
    title: "LactoClear® - Clearing the Path for Peak Recovery",
    description: "Breaking the lactate barrier and restoring metabolic balance. Advanced two-step protocol for mitochondrial support.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LactoClear® - Clear Your Path",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LactoClear® - Clearing the Path for Peak Recovery",
    description: "Breaking the lactate barrier and restoring metabolic balance. Advanced two-step protocol.",
    images: ["/og-image.png"],
    creator: "@lactoclear",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        <CartProvider>
          <AnalyticsTracker />
          <Navigation />
          {children}
          <Footer />
          <FloatingCartButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
