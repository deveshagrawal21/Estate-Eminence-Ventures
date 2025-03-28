'use client';

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { saveProperty, unsaveProperty, isPropertySaved } from "@/utils/supabase/properties";
import { createClient } from "@/utils/supabase/client";

export interface PropertyType {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  type: "sale" | "rent";
  featured?: boolean;
  tags?: string[];
  category: "residential" | "commercial" | "industrial" | "land";
  propertySubType?: string; // e.g., Apartment, Villa, Office Space, Factory, etc.
  location: {
    city: string;
    state: string;
    neighborhood?: string;
    pincode: string;
  };
  amenities?: string[];
}

interface PropertyCardProps {
  property: PropertyType;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    address,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    imageUrl,
    type,
    featured,
    tags,
    category,
    propertySubType,
    location
  } = property;

  const [saved, setSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setIsLoggedIn(true);
        // Check if property is saved
        const isSaved = await isPropertySaved(id);
        setSaved(isSaved);
      }
    };

    checkAuth();
  }, [id]);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to property detail

    if (!isLoggedIn) {
      // Redirect to login or show login message
      window.location.href = "/auth/sign-in?callbackUrl=" + encodeURIComponent(window.location.pathname);
      return;
    }

    setSaving(true);

    try {
      if (saved) {
        const success = await unsaveProperty(id);
        if (success) {
          setSaved(false);
        }
      } else {
        const success = await saveProperty(id);
        if (success) {
          setSaved(true);
        }
      }
    } catch (error) {
      console.error("Error toggling saved property:", error);
    } finally {
      setSaving(false);
    }
  };

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Function to format prices in lakhs/crores for display
  const formatIndianPrice = (price: number): string => {
    if (type === "sale") {
      // Format prices for properties being sold (usually in lakhs/crores)
      if (price >= 10000000) {
        return `${formatter.format(price)} (${(price / 10000000).toFixed(2)} Cr)`;
      } else if (price >= 100000) {
        return `${formatter.format(price)} (${(price / 100000).toFixed(2)} L)`;
      }
    }
    // Return regular format for rent or smaller amounts
    return formatter.format(price);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          crossOrigin="anonymous"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-modulify-blue text-white hover:bg-modulify-blue-dark">Featured</Badge>
          )}
          <Badge className={`bg-purple-500 text-white hover:bg-purple-600`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge className={type === "sale" ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"}>
            For {type === "sale" ? "Sale" : "Rent"}
          </Badge>

          {/* Save Button */}
          <button
            onClick={handleSaveToggle}
            disabled={saving}
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              saved
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            } transition-colors duration-200 hover:scale-105`}
            title={saved ? "Remove from saved" : "Save property"}
          >
            <Heart
              size={16}
              className={saved ? "fill-white" : ""}
              fill={saved ? "white" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <p className="line-clamp-1">
            {location.neighborhood ? `${location.neighborhood}, ` : ''}{location.city}, {location.state}
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-modulify-blue">
            {formatIndianPrice(price)}
            {type === "rent" && <span className="text-sm text-gray-600 font-normal">/mo</span>}
          </span>
          {propertySubType && (
            <Badge variant="outline" className="text-xs capitalize">
              {propertySubType}
            </Badge>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          {bedrooms > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href={`/property-detail?id=${id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
