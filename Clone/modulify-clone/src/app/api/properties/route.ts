import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/data/properties';
import {
  getPropertiesByType,
  getPropertiesByPriceRange,
  getPropertiesByBedrooms,
  getPropertiesByCategory,
  getPropertiesByState,
  getPropertiesByCity,
  getFeaturedProperties,
  searchProperties
} from '@/data/static/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filter parameters
    const type = searchParams.get('type') as 'all' | 'sale' | 'rent' || 'all';
    const priceMin = searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : 0;
    const priceMax = searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : 100000000;
    const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : null;
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const search = searchParams.get('search');

    // Apply filters
    let filteredProperties = properties;

    // Apply type filter
    if (type !== 'all') {
      filteredProperties = getPropertiesByType(type);
    }

    // Apply price range filter
    filteredProperties = filteredProperties.filter(p =>
      p.price >= priceMin && p.price <= priceMax
    );

    // Apply bedrooms filter
    if (bedrooms !== null) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms === bedrooms);
    }

    // Apply featured filter
    if (featured) {
      filteredProperties = filteredProperties.filter(p => p.featured);
    }

    // Apply category filter
    if (category) {
      filteredProperties = filteredProperties.filter(p => p.category === category);
    }

    // Apply state filter
    if (state) {
      filteredProperties = filteredProperties.filter(p => p.location.state === state);
    }

    // Apply city filter
    if (city) {
      filteredProperties = filteredProperties.filter(p => p.location.city === city);
    }

    // Apply property sub-types filter
    const subTypes = searchParams.getAll('propertySubType');
    if (subTypes.length > 0) {
      filteredProperties = filteredProperties.filter(p =>
        p.propertySubType && subTypes.includes(p.propertySubType)
      );
    }

    // Apply amenities filter
    const amenities = searchParams.getAll('amenity');
    if (amenities.length > 0) {
      filteredProperties = filteredProperties.filter(p => {
        if (!p.amenities) return false;
        return amenities.every(a => p.amenities!.includes(a));
      });
    }

    // Apply search filter
    if (search) {
      filteredProperties = searchProperties(search).filter(p =>
        filteredProperties.some(fp => fp.id === p.id)
      );
    }

    return NextResponse.json({ properties: filteredProperties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
