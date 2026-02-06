import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MobileBuyer.in - Buy & Sell Refurbished Second Hand Phones",
  description: "India's trusted platform for buying and selling refurbished second-hand phones since 2001. Founded by Praveen Sharma, serving Delhi NCR with certified pre-owned smartphones.",
  keywords: "second hand phones, refurbished phones, buy old phones, sell used phones, mobile buyer, pre-owned smartphones, certified refurbished mobiles, Delhi NCR",
  authors: [{ name: "Praveen Sharma" }, { name: "Sahil Kumar" }],
  robots: "index, follow",
  openGraph: {
    title: "MobileBuyer.in - Buy & Sell Refurbished Second Hand Phones",
    description: "India's trusted platform for certified refurbished phones since 2001. Buy and sell second-hand smartphones with warranty in Delhi NCR.",
    type: "website",
    locale: "en_IN",
    siteName: "MobileBuyer.in",
    url: "https://mobilebuyer.in",
    images: [
      {
        url: "https://mobilebuyer.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MobileBuyer.in - India's Trusted Second Hand Phone Marketplace since 2001",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MobileBuyer.in - Refurbished Second Hand Phones",
    description: "Buy and sell certified refurbished smartphones with warranty. India's most trusted second-hand phone marketplace since 2001.",
    images: ["https://mobilebuyer.in/og-image.jpg"],
  },
  alternates: {
    canonical: "https://mobilebuyer.in",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3498db',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919210657563"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50 flex items-center justify-center"
          style={{ width: '60px', height: '60px' }}
        >
          <span className="text-2xl">💬</span>
        </a>
      </body>
    </html>
  );
}
