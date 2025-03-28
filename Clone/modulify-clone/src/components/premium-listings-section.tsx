'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { getProperties } from '@/lib/api';
import { PropertyType } from '@/components/property-card';

export function PremiumListingsSection() {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        // Fetch properties and filter for featured ones, limit to 3
        const allProperties = await getProperties({
          featured: true,
          limit: 3
        });
        setFeaturedProperties(allProperties);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format prices in lakhs/crores for display
  const formatIndianPrice = (price: number, type: string): string => {
    if (type === "sale") {
      if (price >= 10000000) {
        return `${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        return `${(price / 100000).toFixed(2)} Lac`;
      }
    } else {
      // For rental properties
      return `${formatter.format(price)}/mo`;
    }
    return formatter.format(price);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium property listings ready to explore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive collection of premium properties curated for discerning buyers and investors
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                <div className="bg-gray-200 h-5 rounded w-3/4 mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>
                <div className="bg-gray-200 h-10 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.length > 0 ? (
                featuredProperties.map((property) => (
                  <Link key={property.id} href={`/property-detail?id=${property.id}`} className="block">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                      <div className="relative h-48">
                        <Image
                          src={property.imageUrl}
                          alt={property.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {property.type === "sale" ? "For Sale" : "For Rent"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span className="line-clamp-1">
                            {property.location.city}, {property.location.state}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-bold text-blue-600 text-lg">
                            {formatIndianPrice(property.price, property.type)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{property.bedrooms}</span> Beds
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{property.bathrooms}</span> Baths
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  No premium listings available at this time.
                </div>
              )}
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                <Link href="/properties" className="inline-flex items-center">
                  View all properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
