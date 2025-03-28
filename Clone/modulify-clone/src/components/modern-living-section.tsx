import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ModernLivingSection() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-blue-800 rounded-lg p-10 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Exceptional homes for modern living</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            The most exclusive luxury properties with premium amenities. Find your dream home today.
          </p>
          <Button asChild className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-6 h-auto rounded-md text-base">
            <Link href="/properties?category=residential&featured=true">
              Explore Premium Homes
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
