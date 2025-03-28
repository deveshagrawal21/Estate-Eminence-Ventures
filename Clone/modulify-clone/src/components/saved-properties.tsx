'use client';

import { useEffect, useState } from 'react';
import { getSavedProperties } from '@/utils/supabase/properties';
import { PropertyType } from '@/components/property-card';
import { PropertyCard } from '@/components/property-card';

export function SavedProperties() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      setIsLoading(true);
      try {
        const savedProperties = await getSavedProperties();
        setProperties(savedProperties);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
        setError('Failed to load your saved properties. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">No saved properties yet</h3>
        <p className="text-gray-600 mb-6">
          Start exploring and save properties you're interested in to view them here.
        </p>
        <a
          href="/properties"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Explore Properties
        </a>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
