import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Buy & Sell Phones | MobileBuyer.in',
  description: 'Explore our services: Buy certified refurbished phones, sell your old phone for cash, phone repair, and quality certification in Delhi NCR.',
  keywords: 'phone services delhi, buy refurbished phones, sell old phone, phone repair, mobile services delhi ncr',
};

export default function Services() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl">Complete Mobile Phone Solutions in Delhi NCR</p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-8 text-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">🚧 Browse Phones - Coming Soon!</h2>
              <p className="text-yellow-700 mb-4">
                We're working hard to bring you an amazing phone browsing experience. Our inventory will be available online soon!
              </p>
              <p className="text-yellow-700">
                In the meantime, call us directly to check available phones: <strong>+91-9210657563</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Buy Phones Service */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Buy Refurbished Phones</h3>
                <p className="text-gray-600 mb-6">
                  Get certified pre-owned smartphones with warranty at unbeatable prices. Every phone undergoes our rigorous 32-point quality check.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ 32-point quality certification</li>
                  <li>✓ Warranty included</li>
                  <li>✓ Best market prices</li>
                  <li>✓ Wide range of brands</li>
                  <li>✓ Free home delivery</li>
                </ul>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-yellow-800 font-semibold">Coming Soon Online!</p>
                  <p className="text-yellow-700">Call +91-9210657563 for current inventory</p>
                </div>
              </div>

              {/* Sell Phones Service */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Sell Your Phone</h3>
                <p className="text-gray-600 mb-6">
                  Turn your old phone into instant cash. Get the best value for your device with our transparent pricing and quick process.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ Instant quote online</li>
                  <li>✓ Free pickup service</li>
                  <li>✓ Best market rates</li>
                  <li>✓ Quick payment</li>
                  <li>✓ All brands accepted</li>
                </ul>
                <Link 
                  href="/sell-phone"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  Get Quote Now
                </Link>
              </div>

              {/* Quality Check Service */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Quality Certification</h3>
                <p className="text-gray-600 mb-6">
                  Our expert technicians perform comprehensive quality checks to ensure every phone meets our high standards.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ 32-point inspection</li>
                  <li>✓ Battery health check</li>
                  <li>✓ Screen condition assessment</li>
                  <li>✓ Hardware functionality test</li>
                  <li>✓ Software optimization</li>
                </ul>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">Quality Guaranteed</p>
                  <p className="text-blue-700">Every certified phone comes with warranty</p>
                </div>
              </div>

              {/* Repair Service */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Phone Repair</h3>
                <p className="text-gray-600 mb-6">
                  Professional repair services for all major smartphone brands. Quick turnaround with genuine parts and expert technicians.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ Screen replacement</li>
                  <li>✓ Battery replacement</li>
                  <li>✓ Camera repair</li>
                  <li>✓ Charging port fix</li>
                  <li>✓ Software issues</li>
                </ul>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-purple-800 font-semibold">Expert Technicians</p>
                  <p className="text-purple-700">Call +91-9205124447 for repair quotes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Service Areas</h2>
            <p className="text-lg text-gray-600 mb-8">
              We provide all services across Delhi NCR with free pickup and delivery
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Delhi</h3>
                <p className="text-blue-600">All areas covered</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Noida</h3>
                <p className="text-green-600">Complete coverage</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Gurgaon</h3>
                <p className="text-purple-600">Full service area</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Faridabad</h3>
                <p className="text-orange-600">All sectors</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">Ghaziabad</h3>
                <p className="text-red-600">Complete area</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800">Delhi NCR</h3>
                <p className="text-indigo-600">Entire region</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Contact us today for any of our services</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919210657563" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                WhatsApp: +91-9210657563
              </a>
              <a 
                href="tel:+919205124447"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Call: +91-9205124447
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}