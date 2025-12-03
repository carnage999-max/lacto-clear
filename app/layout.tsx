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
  title: "LactoClear® - Clearing the Path for Peak Recovery",
  description: "Breaking the lactate barrier and restoring metabolic balance",
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
