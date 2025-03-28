import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transaction-Based Real Estate Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pay Only For What You Need: Flexible pricing options tailored to your specific real estate goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Buying Services */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-2">Buying Services</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-blue-600">1-1.5%</span>
                <span className="text-gray-500 ml-2">of property value</span>
              </div>
              <p className="text-gray-600 text-sm">
                Expert guidance for property acquisition with comprehensive buying support
              </p>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Property search assistance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Market value assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Negotiation support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Documentation handling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Legal compliance review</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-t">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/contact?service=buying">
                  Get started
                </Link>
              </Button>
            </div>
          </div>

          {/* Selling Services */}
          <div className="bg-blue-50 rounded-lg border border-blue-100 shadow-md overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="p-6 border-b border-blue-100">
              <h3 className="text-xl font-bold mb-2">Selling Services</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-blue-600">2%</span>
                <span className="text-gray-500 ml-2">of property value</span>
              </div>
              <p className="text-gray-600 text-sm">
                Comprehensive support to maximize your property's selling potential
              </p>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Property valuation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Professional photography</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Marketing strategy</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Listing on premium platforms</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Negotiation & documentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Legal assistance</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-t border-blue-100">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/contact?service=selling">
                  Get started
                </Link>
              </Button>
            </div>
          </div>

          {/* Investment Services */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-2">Investment Services</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-xl font-bold text-blue-600">Custom</span>
                <span className="text-gray-500 ml-2">pricing</span>
              </div>
              <p className="text-gray-600 text-sm">
                Tailored solutions for investors seeking to build and manage property portfolios
              </p>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Portfolio strategy development</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Investment property sourcing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">ROI analysis & projections</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Financing assistance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Property management solutions</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-t">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/contact?service=investment">
                  Request a quote
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-xl font-bold mb-4">Exceptional Real Estate Services When You Want Them</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Flexible, transparent, and value-driven real estate services tailored to your unique needs. No long-term contracts, just results.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            <Link href="/contact">
              Schedule a consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
