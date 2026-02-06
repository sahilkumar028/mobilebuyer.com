import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - MobileBuyer.in | Trusted Since 2001',
  description: 'Learn about MobileBuyer.in, founded by Praveen Sharma in 2001. 23+ years of experience in buying and selling refurbished phones in Delhi NCR.',
  keywords: 'about mobilebuyer, praveen sharma, second hand phone business, refurbished phones delhi, mobile buyer history',
};

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About MobileBuyer.in</h1>
            <p className="text-xl">Trusted Since 2001 - Your Reliable Phone Partner</p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              
              <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                  Founded in <strong>2001</strong> by <strong>Praveen Sharma</strong>, MobileBuyer.in has been serving the Delhi NCR region for over 23 years. What started as a small venture has grown into one of the most trusted names in the refurbished phone industry.
                </p>
                
                <p>
                  Our journey began with a simple mission: to make quality smartphones accessible to everyone while promoting sustainable technology practices. Over the years, we have helped thousands of customers buy certified refurbished phones and sell their old devices for fair prices.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Choose Us?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">23+ Years Experience</h4>
                    <p>Over two decades of expertise in the mobile phone industry.</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Certified Quality</h4>
                    <p>Every phone undergoes rigorous 32-point quality checks.</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">Local Expertise</h4>
                    <p>Deep understanding of Delhi NCR market and customer needs.</p>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-800 mb-2">Customer First</h4>
                    <p>Thousands of satisfied customers across Delhi NCR.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h3>
                <p>
                  To provide high-quality refurbished smartphones at affordable prices while promoting sustainable technology consumption. We believe in giving phones a second life and helping customers make smart, eco-friendly choices.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Service Areas</h3>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="font-semibold mb-2">We proudly serve:</p>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <li>• Delhi</li>
                    <li>• Noida</li>
                    <li>• Gurgaon</li>
                    <li>• Faridabad</li>
                    <li>• Ghaziabad</li>
                    <li>• Delhi NCR</li>
                  </ul>
                </div>

                <div className="bg-blue-100 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Contact Our Founder</h3>
                  <p className="mb-4">Have questions? Speak directly with Praveen Sharma:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://wa.me/919210657563" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      WhatsApp: +91-9210657563
                    </a>
                    <a 
                      href="tel:+919210657563"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      Call: +91-9210657563
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}