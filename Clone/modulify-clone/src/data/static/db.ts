// Import the property data
import { properties } from "@/data/properties";

// Get all unique locations
export const locations = [...new Set(properties.map(prop =>
  `${prop.location.city}-${prop.location.state}`
))].map(key => {
  const [city, state] = key.split('-');
  const property = properties.find(p =>
    p.location.city === city && p.location.state === state
  );

  return {
    id: `loc-${city}-${state}`.toLowerCase().replace(/\s+/g, '-'),
    city,
    state,
    neighborhood: property?.location.neighborhood || "",
    pincode: property?.location.pincode || ""
  };
});

// Get all states
export const states = [...new Set(properties.map(prop => prop.location.state))];

// Get all cities
export const cities = [...new Set(properties.map(prop => prop.location.city))];

// Get all property categories
export const categories = [...new Set(properties.map(prop => prop.category))];

// Get all property sub-types
export const subTypes = [...new Set(properties.map(prop => prop.propertySubType).filter(Boolean))];

// Get all amenities
export const amenities = [...new Set(
  properties.flatMap(prop => prop.amenities || [])
)];

// Get all tags
export const tags = [...new Set(
  properties.flatMap(prop => prop.tags || [])
)];

// Filter properties by type
export const getPropertiesByType = (type: 'all' | 'sale' | 'rent') => {
  if (type === 'all') return properties;
  return properties.filter(prop => prop.type === type);
};

// Filter properties by price range
export const getPropertiesByPriceRange = (min: number, max: number) => {
  return properties.filter(prop => prop.price >= min && prop.price <= max);
};

// Filter properties by bedrooms
export const getPropertiesByBedrooms = (bedrooms: number) => {
  return properties.filter(prop => prop.bedrooms === bedrooms);
};

// Filter properties by category
export const getPropertiesByCategory = (category: string) => {
  return properties.filter(prop => prop.category === category);
};

// Filter properties by state
export const getPropertiesByState = (state: string) => {
  return properties.filter(prop => prop.location.state === state);
};

// Filter properties by city
export const getPropertiesByCity = (city: string) => {
  return properties.filter(prop => prop.location.city === city);
};

// Get featured properties
export const getFeaturedProperties = () => {
  return properties.filter(prop => prop.featured);
};

// Get property by ID
export const getPropertyById = (id: string) => {
  return properties.find(prop => prop.id === id);
};

// Search properties by query
export const searchProperties = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return properties.filter(property =>
    property.title.toLowerCase().includes(lowerQuery) ||
    property.address.toLowerCase().includes(lowerQuery) ||
    property.location.city.toLowerCase().includes(lowerQuery) ||
    property.location.state.toLowerCase().includes(lowerQuery) ||
    (property.location.neighborhood &&
     property.location.neighborhood.toLowerCase().includes(lowerQuery)) ||
    (property.propertySubType &&
     property.propertySubType.toLowerCase().includes(lowerQuery)) ||
    (property.tags &&
     property.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};
