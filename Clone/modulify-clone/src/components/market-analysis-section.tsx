import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, MapPin, BarChart3 } from "lucide-react";

export function MarketAnalysisSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market analysis to find yours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leverage our AI-powered market analytics to identify properties with the highest potential for appreciation and returns
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-60">
              <Image
                src="https://ext.same-assets.com/2675109532/2343264245.jpg"
                fill
                alt="Market trends visualization"
                style={{ objectFit: "cover" }}
                className="transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <TrendingUp className="text-blue-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold">Price Trend Analysis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Track historical price movements and projected future trends across different neighborhoods and property types.
              </p>
              <Link href="/market-analysis" className="text-blue-600 inline-flex items-center font-medium hover:underline">
                View price trends
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-60">
              <Image
                src="https://ext.same-assets.com/2675109532/1825683624.jpg"
                fill
                alt="Location heat map"
                style={{ objectFit: "cover" }}
                className="transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <MapPin className="text-blue-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold">Location Value Analysis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Identify high-potential areas with our comprehensive neighborhood evaluation system and heat maps.
              </p>
              <Link href="/market-analysis#locations" className="text-blue-600 inline-flex items-center font-medium hover:underline">
                Explore location insights
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-60">
              <Image
                src="https://ext.same-assets.com/2675109532/4254893525.jpg"
                fill
                alt="Investment ROI chart"
                style={{ objectFit: "cover" }}
                className="transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <BarChart3 className="text-blue-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold">Investment ROI Insights</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate potential returns and compare investment scenarios with our advanced ROI calculator.
              </p>
              <Link href="/market-analysis#roi" className="text-blue-600 inline-flex items-center font-medium hover:underline">
                Calculate potential returns
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-xl font-bold mb-3">Need personalized market insights?</h3>
            <p className="text-gray-600">
              Our AI-powered analytics can provide you with tailored recommendations based on your investment goals, budget, and preferences.
            </p>
          </div>
          <div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Link href="/contact">
                Get personalized insights
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
