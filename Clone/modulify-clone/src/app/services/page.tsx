import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div>
      <NavBar />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
          <p className="text-center text-gray-600 mb-12">
            Estate Eminence Ventures offers a comprehensive suite of real estate services powered by artificial intelligence.
          </p>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Property Search & Recommendations</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our AI-powered search engine analyzes thousands of properties to find the perfect match for your requirements.
                By understanding your preferences, budget, and long-term goals, we provide personalized recommendations that
                save you time and maximize your investment potential.
              </p>
              <div className="mt-4">
                <Link href="/properties" className="text-blue-500 font-medium hover:underline inline-flex items-center">
                  Start searching
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Market Analysis & Insights</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Make data-driven decisions with our comprehensive market analysis tools. Our platform aggregates and analyzes
                real estate data across India's major markets, providing valuable insights on price trends, rental yields,
                neighborhood dynamics, and investment potential.
              </p>
              <div className="mt-4">
                <Link href="/market-analysis" className="text-blue-500 font-medium hover:underline inline-flex items-center">
                  Explore market insights
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Investment Advisory</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our team of experienced real estate investment advisors combines human expertise with AI-powered analytics
                to provide personalized investment strategies. Whether you're a first-time investor or looking to expand your
                portfolio, we help you identify opportunities that align with your financial goals.
              </p>
              <div className="mt-4">
                <Link href="/contact" className="text-blue-500 font-medium hover:underline inline-flex items-center">
                  Schedule a consultation
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">AI Property Valuation</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Get accurate, data-driven property valuations powered by our proprietary AI algorithms. By analyzing
                thousands of data points including location, amenities, historical transactions, and market trends,
                we provide precise valuations that help you make informed decisions.
              </p>
              <div className="mt-4">
                <Link href="/pricing" className="text-blue-500 font-medium hover:underline inline-flex items-center">
                  Learn more about our valuation services
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Ready to get started?</h2>
          <p className="text-center text-gray-600 mb-6">
            Contact our team today to discuss how Estate Eminence Ventures can help you achieve your real estate goals.
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
