import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative hero-gradient text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-hero-pattern bg-repeat"
        aria-hidden="true"
      />
      <div className="container max-w-7xl relative z-10 mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find faster.<br />
            Invest smarter.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Discover premium properties and investment opportunities with Estate Eminence Ventures' comprehensive platform across India's most desirable locations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild variant="default" size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600">
              <Link href="/properties">
                Start your search
              </Link>
            </Button>
            <p className="text-sm text-gray-300">
              Premium listings<br />
              From ₹45,000/mo to ₹9 Cr
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="#why-choose-estate-eminence"
              className="text-white font-medium inline-flex items-center"
            >
              <span>Why choose Estate Eminence Ventures</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
