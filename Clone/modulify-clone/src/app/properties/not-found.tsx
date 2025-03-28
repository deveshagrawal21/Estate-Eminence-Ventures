import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-modulify-blue mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Property Not Found</h2>
        <p className="text-gray-600 mb-8">
          The property you're looking for does not exist or has been removed from our listings.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="default">
            <Link href="/properties">
              Browse Properties
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
