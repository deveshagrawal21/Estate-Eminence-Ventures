import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  image: string;
}

const TeamMember = ({ name, position, bio, image }: TeamMemberProps) => (
  <div className="flex flex-col items-center">
    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: "cover" }}
        className="transition-transform hover:scale-110"
      />
    </div>
    <h3 className="text-xl font-bold mb-1">{name}</h3>
    <p className="text-blue-600 mb-2 text-sm">{position}</p>
    <p className="text-gray-600 text-center text-sm">{bio}</p>
  </div>
);

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

const TimelineItem = ({ year, title, description }: TimelineItemProps) => (
  <div className="flex mb-8">
    <div className="flex-shrink-0 w-24 text-right pr-6">
      <div className="text-blue-600 font-bold">{year}</div>
    </div>
    <div className="w-2 relative flex justify-center">
      <div className="h-full w-0.5 bg-blue-200"></div>
      <div className="absolute w-3 h-3 rounded-full bg-blue-600 border-2 border-white top-1.5"></div>
    </div>
    <div className="flex-grow pl-6">
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Arjun Mehta",
      position: "Founder & CEO",
      bio: "With over 15 years in real estate and technology, Arjun has transformed property transactions across major Indian markets through innovative AI applications.",
      image: "https://ext.same-assets.com/2675109532/4219578321.jpg"
    },
    {
      name: "Priya Sharma",
      position: "Chief Technology Officer",
      bio: "Leading our technology initiatives, Priya brings expertise in AI and machine learning to create cutting-edge solutions for real estate analytics.",
      image: "https://ext.same-assets.com/2675109532/1932764812.jpg"
    },
    {
      name: "Rajiv Kumar",
      position: "Head of Real Estate",
      bio: "A veteran in Indian real estate markets, Rajiv oversees property acquisitions and market strategy across Delhi NCR, Mumbai, and Bangalore.",
      image: "https://ext.same-assets.com/2675109532/3847562912.jpg"
    },
    {
      name: "Aisha Patel",
      position: "Chief Analytics Officer",
      bio: "Aisha leads our data science team, developing predictive models that help clients make data-driven investment decisions in India's dynamic property market.",
      image: "https://ext.same-assets.com/2675109532/7846392157.jpg"
    }
  ];

  const timeline = [
    {
      year: "2022",
      title: "Estate Eminence Ventures Founded",
      description: "Founded in Bangalore with a mission to transform property transactions through AI and data analytics."
    },
    {
      year: "2022",
      title: "Seed Funding Secured",
      description: "Raised ₹10 crore seed funding to develop AI-powered property matching and market analysis tools."
    },
    {
      year: "2023",
      title: "Expansion to Delhi NCR & Mumbai",
      description: "Expanded operations to Delhi NCR and Mumbai markets, growing our property database to over 10,000 listings."
    },
    {
      year: "2023",
      title: "Launch of AI Analytics Platform",
      description: "Released our proprietary AI analytics platform, providing unprecedented market insights and property valuations."
    },
    {
      year: "2024",
      title: "Series A Funding",
      description: "Secured ₹50 crore Series A funding to scale operations and enhance our technological capabilities."
    },
    {
      year: "2024",
      title: "Expansion to Tier 2 Cities",
      description: "Began operations in Pune, Hyderabad, and Chennai, bringing our innovative approach to emerging property markets."
    },
    {
      year: "2025",
      title: "Launch of Full-Service Transaction Support",
      description: "Introduced end-to-end transaction support, handling everything from property search to registration."
    }
  ];

  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About Estate Eminence Ventures</h1>
            <p className="text-xl text-blue-100">
              Transforming India's real estate landscape through artificial intelligence and data-driven insights
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Estate Eminence Ventures, our mission is to revolutionize the Indian real estate market by leveraging
                artificial intelligence to create a transparent, efficient, and accessible platform for property buyers,
                sellers, and investors. We believe that everyone deserves access to premium properties and investment
                opportunities, regardless of their experience in the real estate sector.
              </p>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-gray-600">
                To become India's most trusted AI-powered real estate platform, making property transactions as seamless,
                transparent, and rewarding as possible. We envision a future where data-driven insights are accessible to all,
                enabling better decision-making in one of life's most significant investments.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://ext.same-assets.com/2675109532/3284716583.jpg"
                alt="Estate Eminence Ventures Office"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in all our dealings, providing accurate and comprehensive information to empower
                our clients to make informed decisions. No hidden fees, no ambiguity—just clear, honest communication.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Innovation is at the heart of everything we do. By continuously pushing the boundaries of AI and data analytics in real
                estate, we develop cutting-edge solutions that address the evolving needs of the Indian property market.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Client-Centricity</h3>
              <p className="text-gray-600">
                Our clients are at the center of everything we do. We're committed to understanding their unique needs and providing
                personalized solutions that help them achieve their real estate goals, whether buying, selling, or investing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Leadership Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our team combines expertise in real estate, technology, finance, and data science to deliver
              exceptional results for our clients across India.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Journey</h2>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Achievements</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">Premium Properties</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">₹500+ Cr</div>
              <p className="text-gray-600">Transaction Value</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or invest in Indian real estate,
            Estate Eminence Ventures is your trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-blue-800">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
