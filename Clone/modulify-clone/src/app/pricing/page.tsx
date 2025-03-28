import { PricingSection } from "@/components/pricing-section";

export default function PricingPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your projects. All plans include a 7-day free trial
            so you can explore Modulify with confidence.
          </p>
        </div>
      </div>
      <PricingSection />
    </div>
  );
}
