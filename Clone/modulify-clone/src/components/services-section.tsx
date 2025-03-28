import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real estate services across India's top cities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive end-to-end property solutions powered by cutting-edge technology and local expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="https://ext.same-assets.com/2675109532/3756839752.svg"
                width={32}
                height={32}
                alt="Property Search Icon"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Smart property AI-finds</h3>
            <p className="text-gray-600 text-sm mb-4">
              Our AI-powered system matches properties to your exact requirements and preferences.
            </p>
            <Link href="/properties" className="text-blue-600 inline-flex items-center text-sm font-medium hover:underline">
              Find your property
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="https://ext.same-assets.com/2675109532/2835693741.svg"
                width={32}
                height={32}
                alt="Market Analysis Icon"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Market-backed insights</h3>
            <p className="text-gray-600 text-sm mb-4">
              Data-driven transaction insights, market timing, property valuation, and developer reputation analysis.
            </p>
            <Link href="/market-analysis" className="text-blue-600 inline-flex items-center text-sm font-medium hover:underline">
              View market insights
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="https://ext.same-assets.com/2675109532/1975843951.svg"
                width={32}
                height={32}
                alt="Document Icon"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Full-service transactions</h3>
            <p className="text-gray-600 text-sm mb-4">
              End-to-end support for property transactions including legal verification, documentation, and registration.
            </p>
            <Link href="/services" className="text-blue-600 inline-flex items-center text-sm font-medium hover:underline">
              Explore our services
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="https://ext.same-assets.com/2675109532/4837462851.svg"
                width={32}
                height={32}
                alt="Support Icon"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Expert advisory support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Dedicated real estate professionals to guide you from property selection to transaction closure.
            </p>
            <Link href="/contact" className="text-blue-600 inline-flex items-center text-sm font-medium hover:underline">
              Contact our experts
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-xl font-bold mb-3">Ready to transform your real estate journey?</h3>
            <p className="text-gray-600">
              Experience AI-powered property search, market insights, and end-to-end transaction support with Estate Eminence Ventures.
            </p>
          </div>
          <div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Link href="/properties">
                Browse properties
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
