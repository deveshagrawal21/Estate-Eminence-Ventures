import { PropertyType } from "@/components/property-card";
import { PropertyFilters } from "./db";

/**
 * Get all properties with optional filtering
 */
export async function getProperties(filters?: PropertyFilters): Promise<PropertyType[]> {
  try {
    let url = '/api/properties';

    // Add filter parameters if provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();

      if (filters.type && filters.type !== 'all') {
        params.append('type', filters.type);
      }

      if (filters.priceMin !== undefined) {
        params.append('priceMin', filters.priceMin.toString());
      }

      if (filters.priceMax !== undefined) {
        params.append('priceMax', filters.priceMax.toString());
      }

      if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
        params.append('bedrooms', filters.bedrooms.toString());
      }

      if (filters.featured) {
        params.append('featured', 'true');
      }

      if (filters.category) {
        params.append('category', filters.category);
      }

      if (filters.propertySubTypes && filters.propertySubTypes.length > 0) {
        filters.propertySubTypes.forEach(subType => {
          params.append('propertySubType', subType);
        });
      }

      if (filters.state) {
        params.append('state', filters.state);
      }

      if (filters.city) {
        params.append('city', filters.city);
      }

      if (filters.amenities && filters.amenities.length > 0) {
        filters.amenities.forEach(amenity => {
          params.append('amenity', amenity);
        });
      }

      if (filters.search) {
        params.append('search', filters.search);
      }

      url = `${url}?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

/**
 * Get a property by its ID
 */
export async function getPropertyById(id: string): Promise<PropertyType | null> {
  try {
    const response = await fetch(`/api/property-detail?id=${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.property;
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return null;
  }
}

/**
 * Get all locations
 */
export async function getLocations() {
  try {
    const response = await fetch('/api/locations');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

/**
 * Get all amenities
 */
export async function getAmenities() {
  try {
    const response = await fetch('/api/amenities');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.amenities;
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
}

/**
 * Get all tags
 */
export async function getTags() {
  try {
    const response = await fetch('/api/tags');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}
