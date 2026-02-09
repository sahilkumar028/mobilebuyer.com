import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MobileBuyer.in - Buy & Sell Refurbished Phones in Delhi NCR | Since 2001',
  description: 'India\'s most trusted marketplace for certified refurbished phones since 2001. Buy second-hand smartphones with warranty or sell your old phone for instant cash in Delhi, Noida, Gurgaon, Faridabad & Ghaziabad.',
  keywords: 'buy second hand phones Delhi NCR, sell old phone cash Delhi, refurbished phones warranty Noida, certified pre-owned smartphones Gurgaon, mobile buyer Faridabad, second hand phone marketplace Ghaziabad',
  openGraph: {
    title: 'MobileBuyer.in - Delhi NCR\'s Trusted Second Hand Phone Marketplace Since 2001',
    description: 'Buy certified refurbished phones with warranty or sell your old phone for instant cash. Serving Delhi, Noida, Gurgaon, Faridabad & Ghaziabad since 2001.',
    url: 'https://mobilebuyer.in',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mobilebuyer.in',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell Refurbished Phones
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 opacity-90">
              Trusted Since 2001 - Serving Delhi NCR
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Get certified pre-owned smartphones with warranty at unbeatable prices.
              Sell your old phone and get instant cash with our hassle-free process across Delhi, Noida, Gurgaon, Faridabad & Ghaziabad.
            </p>

            {/* Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "MobileBuyer.in",
                  "description": "India's trusted platform for buying and selling refurbished second-hand phones since 2001",
                  "url": "https://mobilebuyer.in",
                  "logo": "https://mobilebuyer.in/logo.png",
                  "foundingDate": "2001",
                  "founder": {
                    "@type": "Person",
                    "name": "Praveen Sharma"
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-9210657563",
                      "contactType": "customer service",
                      "areaServed": ["Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Delhi NCR"],
                      "availableLanguage": ["English", "Hindi"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-9205112447",
                      "contactType": "sales",
                      "areaServed": ["Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Delhi NCR"],
                      "availableLanguage": ["English", "Hindi"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-7669973262",
                      "contactType": "customer service",
                      "areaServed": ["Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Delhi NCR"],
                      "availableLanguage": ["English", "Hindi"]
                    }
                  ],
                  "email": ["praveen9@gmail.com", "praveen@mobilebuyer.in"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressRegion": "Delhi NCR",
                    "addressCountry": "IN"
                  },
                  "areaServed": ["Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Delhi NCR"],
                  "sameAs": [
                    "https://wa.me/919210657563",
                    "https://wa.me/919205112447",
                    "https://wa.me/917669973262"
                  ]
                })
              }}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sell-phone"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Sell Your Phone
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Coming Soon
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Why Choose MobileBuyer.in?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Certified Quality</h3>
                <p className="text-gray-600">
                  Every phone undergoes rigorous 32-point quality checks and comes with warranty for your peace of mind.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Best Prices</h3>
                <p className="text-gray-600">
                  Get the best value for your money with our competitive pricing and instant cash for your old phones.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Free Pickup & Delivery</h3>
                <p className="text-gray-600">
                  Convenient doorstep pickup and delivery service across Delhi NCR - Delhi, Noida, Gurgaon, Faridabad & Ghaziabad. No hassle, no extra cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Phones Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Popular Refurbished Phones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* iPhone 13 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">📱</div>
                <h3 className="text-lg font-semibold mb-2 text-center">iPhone 13</h3>
                <p className="text-gray-600 text-center mb-4">Starting from ₹35,000</p>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Certified</span>
                </div>
              </div>

              {/* Samsung Galaxy S22 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">📱</div>
                <h3 className="text-lg font-semibold mb-2 text-center">Galaxy S22</h3>
                <p className="text-gray-600 text-center mb-4">Starting from ₹28,000</p>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Certified</span>
                </div>
              </div>

              {/* OnePlus 9 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">📱</div>
                <h3 className="text-lg font-semibold mb-2 text-center">OnePlus 9</h3>
                <p className="text-gray-600 text-center mb-4">Starting from ₹22,000</p>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Certified</span>
                </div>
              </div>

              {/* Xiaomi Mi 11 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">📱</div>
                <h3 className="text-lg font-semibold mb-2 text-center">Xiaomi Mi 11</h3>
                <p className="text-gray-600 text-center mb-4">Starting from ₹18,000</p>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Certified</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all inline-block"
              >
                View All Phones
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* WhatsApp Contact */}
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-4">WhatsApp Us</h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/919210657563"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Chat: +91-9210657563
                  </a>
                  <a
                    href="https://wa.me/919205112447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Chat: +91-9205112447
                  </a>
                  <a
                    href="https://wa.me/917669973262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Chat: +91-7669973262
                  </a>
                </div>
              </div>

              {/* Call Contact */}
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-4">Call Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919210657563"
                    className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Call: +91-9210657563
                  </a>
                  <a
                    href="tel:+919205112447"
                    className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Call: +91-9205112447
                  </a>
                  <a
                    href="tel:+917669973262"
                    className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Call: +91-7669973262
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Tell Us About Your Phone</h3>
                <p className="text-gray-600">Share details about your phone's condition and get an instant quote.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Schedule Pickup</h3>
                <p className="text-gray-600">Choose a convenient time for our executive to visit your location.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Check</h3>
                <p className="text-gray-600">Our expert verifies the phone condition and confirms the final price.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600">Receive instant payment via UPI, bank transfer, or cash.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Sell Your Phone?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Get an instant quote and turn your old phone into cash today. It's quick, easy, and completely secure.
            </p>
            <Link
              href="/sell-phone"
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 inline-block"
            >
              Get Quote Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}