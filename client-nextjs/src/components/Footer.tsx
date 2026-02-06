import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">MobileBuyer.in</h3>
            <p className="text-gray-300 mb-4">
              India's trusted platform for buying and selling refurbished second-hand phones since 2001. Founded by Praveen Sharma, serving Delhi NCR with quality assurance.
            </p>
            <div className="text-gray-300 space-y-2">
              <p>📧 praveen9@gmail.com</p>
              <p>� +praveen@mobilebuyer.in</p>
              <p>📞 +91-9210657563</p>
              <p>📞 +91-9205124447</p>
              <p>💬 WhatsApp: +91-9210657563</p>
              <p>💬 WhatsApp: +91-9205124447</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Delhi</li>
              <li>Noida</li>
              <li>Gurgaon</li>
              <li>Faridabad</li>
              <li>Ghaziabad</li>
              <li>Delhi NCR</li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Popular Brands</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Apple iPhone</li>
              <li>Samsung Galaxy</li>
              <li>OnePlus</li>
              <li>Xiaomi</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MobileBuyer.in. All rights reserved. | Founded by Praveen Sharma in 2001</p>
          <p className="mt-2">Website developed by Sahil Kumar | Made with ❤️ for sustainable technology</p>
        </div>
      </div>
    </footer>
  );
}