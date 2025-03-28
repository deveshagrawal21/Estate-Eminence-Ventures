import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaDiscord, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

interface FooterProps {
  variant?: "light" | "dark";
}

export function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer className={`${isDark ? 'bg-black text-gray-300 border-gray-800' : 'bg-white text-gray-600 border-gray-200'} py-12 border-t`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1">
            <Link href="/">
              <div className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Estate Eminence Ventures
              </div>
            </Link>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              India's premier AI-powered real estate platform
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Headquartered in Bangalore, India
            </p>
          </div>

          <div className="col-span-1">
            <h3 className={`font-medium text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Estate Eminence Ventures</Link>
              </li>
              <li>
                <Link href="/generate-with-ai" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Generate with AI</Link>
              </li>
              <li>
                <Link href="/pricing" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Pricing</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={`font-medium text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/insights" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Insights</Link>
              </li>
              <li>
                <Link href="/faqs" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={`font-medium text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?location=delhi" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Delhi NCR</Link>
              </li>
              <li>
                <Link href="/properties?location=mumbai" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Mumbai</Link>
              </li>
              <li>
                <Link href="/properties?location=bangalore" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Bangalore</Link>
              </li>
              <li>
                <Link href="/properties?location=hyderabad" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Hyderabad</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={`font-medium text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Join Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://twitter.com/estateeminence" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
                <FaTwitter size={18} />
              </a>
              <a href="https://discord.com/invite/estateeminence" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
                <FaDiscord size={18} />
              </a>
              <a href="https://www.linkedin.com/company/estate-eminence-ventures" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
                <FaLinkedinIn size={18} />
              </a>
              <a href="https://www.instagram.com/estateeminence" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
                <FaInstagram size={18} />
              </a>
              <a href="https://www.facebook.com/estateeminence" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
                <FaFacebookF size={18} />
              </a>
            </div>
            <div className="space-y-2">
              <Link href="/legal/terms" className={`block ${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Terms</Link>
              <Link href="/legal/privacy-policy" className={`block ${isDark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'} text-sm`}>Privacy</Link>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'} text-center text-sm`}>
          © 2025 - Estate Eminence Ventures - All rights reserved. | A proud Indian company serving the nation's real estate needs
        </div>
      </div>
    </footer>
  );
}
