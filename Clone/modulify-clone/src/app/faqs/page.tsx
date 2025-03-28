import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQsPage() {
  const faqs = [
    {
      question: "What is Estate Eminence Ventures?",
      answer: "Estate Eminence Ventures is a full-service real estate company that leverages AI technology to help clients find, analyze, and acquire premium properties. We offer a range of services from property search to investment analysis and transaction support."
    },
    {
      question: "How does your property matching service work?",
      answer: "Our AI-powered property matching system analyzes your preferences, budget, and lifestyle needs to identify properties that meet your specific criteria. As you interact with properties, our system learns and refines its recommendations to provide increasingly relevant options."
    },
    {
      question: "Do I need to pay to search for properties?",
      answer: "No, our basic property search tools are free to use. You can browse listings, set up email alerts, and access basic market insights without any cost. Our premium services, which include advanced analytics and personalized support, require a subscription or transaction-based fee."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently operate in major metropolitan areas across the United States, with a particular focus on luxury and high-growth markets. Our international division also handles properties in select global destinations. Contact us for specific location availability."
    },
    {
      question: "How do your fees compare to traditional real estate services?",
      answer: "For transaction-based services, our fees are competitive with traditional brokerages, typically ranging from 1-2.5% based on the service level and property value. Our membership plans provide continuous access to our platform and advisors, offering significant value for serious buyers, sellers, and investors."
    },
    {
      question: "Can I use Estate Eminence Ventures for investment properties?",
      answer: "Absolutely! We specialize in investment property analysis and acquisition. Our platform provides detailed ROI projections, market trend insights, and cash flow analysis to help you make informed investment decisions. Our Elite and Concierge members also receive personalized investment strategy sessions."
    },
    {
      question: "How does the virtual tour feature work?",
      answer: "Our virtual tour technology allows you to explore properties remotely in high-definition 3D. You can navigate through each room, measure spaces, and even visualize potential renovations. For Elite and Concierge members, we also offer live virtual tours with a dedicated agent who can answer questions in real-time."
    },
    {
      question: "What if I need help using the platform or have questions about a property?",
      answer: "We offer support at every membership level. Basic users can access our help center and email support. Premium members receive priority support and regular consultation calls. Elite and Concierge members are assigned a dedicated advisor who is available for personalized assistance throughout your real estate journey."
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Estate Eminence Ventures and our real estate services.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our real estate specialists are here to help you with any questions about our services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="gradient" className="rounded-full">
              <Link href="/contact">
                Contact a Specialist
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="https://app.estateeminenceventures.com">
                Explore Properties
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
