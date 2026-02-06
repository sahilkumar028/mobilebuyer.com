import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get Instant Phone Quote | MobileBuyer.in',
  description: 'Contact MobileBuyer.in for instant phone quotes, professional refurbishment services, customer support, and all your second-hand phone needs in Delhi NCR.',
  keywords: 'contact mobile buyer, phone quote, sell phone contact, refurbished phone support, second hand phone help, mobile buyer customer service, delhi ncr phone services',
  openGraph: {
    title: 'Contact MobileBuyer.in - Get Instant Quote for Your Phone',
    description: 'Get instant quotes for your old phone, find perfect refurbished smartphones, or reach out for assistance. Serving Delhi NCR since 2001.',
    url: 'https://mobilebuyer.in/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mobilebuyer.in/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}