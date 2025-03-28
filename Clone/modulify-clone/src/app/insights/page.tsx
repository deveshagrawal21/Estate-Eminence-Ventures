import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InsightsPage() {
  // Sample blog posts
  const posts = [
    {
      id: 1,
      title: "How AI is Transforming Website Design in 2025",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we design and build websites, making the process faster and more intuitive.",
      image: "https://ext.same-assets.com/2675109532/2399864735.png",
      date: "March 15, 2025"
    },
    {
      id: 2,
      title: "From Concept to Live Website in 30 Minutes",
      excerpt: "A step-by-step case study on how a team used Estate Eminence Ventures to build and deploy a complete website for their startup in under an hour.",
      image: "https://ext.same-assets.com/2675109532/133880252.png",
      date: "March 8, 2025"
    },
    {
      id: 3,
      title: "The Future of Web Design: AI-Generated Sitemaps",
      excerpt: "Learn how AI-generated sitemaps are changing the game for web designers and developers, streamlining the planning process.",
      image: "https://ext.same-assets.com/2675109532/651110239.png",
      date: "February 28, 2025"
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Insights & Resources</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, tips, and best practices in AI-powered web design and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-modulify-blue mb-2">{post.date}</p>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/insights/${post.id}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest insights and updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-modulify-blue focus:border-transparent"
            />
            <Button variant="gradient" className="rounded-full">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
