import { PropertyType } from "@/components/property-card";
import fs from 'fs';
import path from 'path';
import { properties as initialProperties } from "@/data/properties";

// Define database structure
interface DBStructure {
  properties: PropertyType[];
  locations: LocationType[];
  amenities: AmenityType[];
  tags: TagType[];
}

interface LocationType {
  id: string;
  city: string;
  state: string;
  neighborhood?: string;
  pincode: string;
}

interface AmenityType {
  id: string;
  name: string;
}

interface TagType {
  id: string;
  name: string;
}

export interface PropertyFilters {
  type?: 'all' | 'sale' | 'rent';
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number | null;
  featured?: boolean;
  category?: string;
  propertySubTypes?: string[];
  state?: string;
  city?: string;
  amenities?: string[];
  search?: string;
}

// Path to our JSON "database" file
const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

// Initialize database if it doesn't exist
export function initializeDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData: DBStructure = {
      properties: initialProperties,
      locations: getUniqueLocations(initialProperties),
      amenities: getUniqueAmenities(initialProperties),
      tags: getUniqueTags(initialProperties),
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

// Get unique locations from properties
function getUniqueLocations(properties: PropertyType[]): LocationType[] {
  const locationsMap = new Map<string, LocationType>();

  properties.forEach(property => {
    const locationKey = `${property.location.city}-${property.location.state}`;
    if (!locationsMap.has(locationKey)) {
      locationsMap.set(locationKey, {
        id: crypto.randomUUID(),
        city: property.location.city,
        state: property.location.state,
        neighborhood: property.location.neighborhood,
        pincode: property.location.pincode
      });
    }
  });

  return Array.from(locationsMap.values());
}

// Get unique amenities from properties
function getUniqueAmenities(properties: PropertyType[]): AmenityType[] {
  const amenitiesSet = new Set<string>();

  properties.forEach(property => {
    if (property.amenities) {
      property.amenities.forEach(amenity => {
        amenitiesSet.add(amenity);
      });
    }
  });

  return Array.from(amenitiesSet).map(name => ({
    id: crypto.randomUUID(),
    name
  }));
}

// Get unique tags from properties
function getUniqueTags(properties: PropertyType[]): TagType[] {
  const tagsSet = new Set<string>();

  properties.forEach(property => {
    if (property.tags) {
      property.tags.forEach(tag => {
        tagsSet.add(tag);
      });
    }
  });

  return Array.from(tagsSet).map(name => ({
    id: crypto.randomUUID(),
    name
  }));
}

// Read data from the database
export function readDB(): DBStructure | null {
  try {
    initializeDB();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data) as DBStructure;
  } catch (error) {
    console.error('Error reading database:', error);
    return null;
  }
}

// Write data to the database
export function writeDB(data: DBStructure): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}

// Get all properties
export function getAllProperties(): PropertyType[] {
  const db = readDB();
  return db?.properties || [];
}

// Get property by ID
export function getPropertyById(id: string): PropertyType | undefined {
  const properties = getAllProperties();
  return properties.find(property => property.id === id);
}

// Filter properties based on criteria
export function filterProperties(filters: PropertyFilters): PropertyType[] {
  let properties = getAllProperties();

  // Apply filters
  if (filters.type && filters.type !== 'all') {
    properties = properties.filter(property => property.type === filters.type);
  }

  if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
    properties = properties.filter(property =>
      property.price >= filters.priceMin! && property.price <= filters.priceMax!
    );
  }

  if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
    properties = properties.filter(property => property.bedrooms === filters.bedrooms);
  }

  if (filters.featured) {
    properties = properties.filter(property => property.featured);
  }

  if (filters.category) {
    properties = properties.filter(property => property.category === filters.category);
  }

  if (filters.propertySubTypes && filters.propertySubTypes.length > 0) {
    properties = properties.filter(property =>
      filters.propertySubTypes!.includes(property.propertySubType || "")
    );
  }

  if (filters.state) {
    properties = properties.filter(property => property.location.state === filters.state);
  }

  if (filters.city) {
    properties = properties.filter(property => property.location.city === filters.city);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    properties = properties.filter(property => {
      if (!property.amenities) return false;
      return filters.amenities!.every((amenity: string) =>
        property.amenities?.includes(amenity)
      );
    });
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    properties = properties.filter(property =>
      property.title.toLowerCase().includes(search) ||
      property.address.toLowerCase().includes(search) ||
      property.location.city.toLowerCase().includes(search) ||
      property.location.state.toLowerCase().includes(search) ||
      (property.location.neighborhood &&
       property.location.neighborhood.toLowerCase().includes(search)) ||
      (property.propertySubType &&
       property.propertySubType.toLowerCase().includes(search)) ||
      (property.tags &&
       property.tags.some(tag => tag.toLowerCase().includes(search)))
    );
  }

  return properties;
}

// Get all locations
export function getAllLocations(): LocationType[] {
  const db = readDB();
  return db?.locations || [];
}

// Get all amenities
export function getAllAmenities(): AmenityType[] {
  const db = readDB();
  return db?.amenities || [];
}

// Get all tags
export function getAllTags(): TagType[] {
  const db = readDB();
  return db?.tags || [];
}
