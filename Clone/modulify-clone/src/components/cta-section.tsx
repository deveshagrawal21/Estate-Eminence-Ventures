import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section id="CTA-Section" className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            Exceptional Real Estate Service starts here.<br />
            Try Estate Eminence Ventures Now!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            The only full-service real estate platform you need to find, analyze, and acquire premium properties.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Button asChild variant="gradient" size="lg" className="px-8 rounded-full">
                <Link href="https://app.estateeminenceventures.com/signup">
                  Find Properties
                </Link>
              </Button>
              <div className="hidden sm:block absolute -right-4 -top-2 transform rotate-12">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7574 0.242629C20.0811 0.566047 20.0811 1.09095 19.7574 1.41437L1.41437 19.7574C1.09095 20.0811 0.566047 20.0811 0.242629 19.7574C-0.0807765 19.4339 -0.0807765 18.909 0.242629 18.5856L18.5856 0.242629C18.909 -0.0807765 19.4339 -0.0807765 19.7574 0.242629Z" fill="#11BEF1"/>
                  <path d="M0.242629 0.242629C0.566047 -0.0807765 1.09095 -0.0807765 1.41437 0.242629L19.7574 18.5856C20.0811 18.909 20.0811 19.4339 19.7574 19.7574C19.4339 20.0811 18.909 20.0811 18.5856 19.7574L0.242629 1.41437C-0.0807765 1.09095 -0.0807765 0.566047 0.242629 0.242629Z" fill="#11BEF1"/>
                </svg>
              </div>
            </div>

            <Button asChild variant="outline" size="lg" className="px-8 rounded-full">
              <Link href="/contact" className="flex items-center">
                <span>Schedule a Consultation</span>
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
