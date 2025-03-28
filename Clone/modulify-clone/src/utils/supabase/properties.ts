import { createClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { PropertyType } from '@/components/property-card';

// Define types for the database schema
interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_main: boolean;
  display_order: number;
  created_at: string;
}

interface PropertyAmenity {
  property_id: string;
  amenity_id: string;
  amenities: {
    name: string;
  };
}

interface DbProperty {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  property_type: string;
  listing_type: 'sale' | 'rent';
  is_featured: boolean;
  main_image_url: string | null;
  created_at: string;
  updated_at: string;
  property_images?: PropertyImage[];
  property_amenities?: PropertyAmenity[];
}

// Function to fetch all properties
export async function getAllProperties(): Promise<PropertyType[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*),
        property_amenities (
          amenity_id,
          amenities (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }

    // Transform the data to match our PropertyType interface
    return (data as DbProperty[]).map(property => {
      const mainImage = property.property_images?.find((img: PropertyImage) => img.is_main) || property.property_images?.[0];

      return {
        id: property.id,
        title: property.title,
        address: property.location, // Using location field as address
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFeet: property.area_sqft,
        imageUrl: mainImage?.image_url || property.main_image_url || '',
        type: property.listing_type,
        featured: property.is_featured,
        tags: [], // Need to implement tags functionality
        category: property.property_type.toLowerCase() as 'residential' | 'commercial' | 'industrial' | 'land',
        propertySubType: property.property_type,
        location: {
          city: property.city,
          state: property.state,
          neighborhood: '', // We'll need to extend the schema for this
          pincode: ''
        },
        amenities: property.property_amenities?.map(item => item.amenities.name) || []
      };
    });
  } catch (error) {
    console.error('Unexpected error in getAllProperties:', error);
    return [];
  }
}

// Function to fetch a single property by ID
export async function getPropertyById(id: string): Promise<PropertyType | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*),
        property_amenities (
          amenity_id,
          amenities (name)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }

    // Transform the data
    const property = data as DbProperty;
    const mainImage = property.property_images?.find((img: PropertyImage) => img.is_main) || property.property_images?.[0];

    return {
      id: property.id,
      title: property.title,
      address: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.area_sqft,
      imageUrl: mainImage?.image_url || property.main_image_url || '',
      type: property.listing_type,
      featured: property.is_featured,
      tags: [],
      category: property.property_type.toLowerCase() as 'residential' | 'commercial' | 'industrial' | 'land',
      propertySubType: property.property_type,
      location: {
        city: property.city,
        state: property.state,
        neighborhood: '',
        pincode: ''
      },
      amenities: property.property_amenities?.map(item => item.amenities.name) || []
    };
  } catch (error) {
    console.error('Unexpected error in getPropertyById:', error);
    return null;
  }
}

// Function to save a property for a user
export async function saveProperty(propertyId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    // First, get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error getting user or user not logged in:', userError);
      return false;
    }

    // Save the property
    const { error } = await supabase
      .from('saved_properties')
      .insert({
        user_id: user.id,
        property_id: propertyId
      });

    if (error) {
      // If error is due to unique constraint (property already saved)
      if (error.code === '23505') {
        console.log('Property already saved');
        return true;
      }

      console.error('Error saving property:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in saveProperty:', error);
    return false;
  }
}

// Function to unsave a property for a user
export async function unsaveProperty(propertyId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    // First, get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error getting user or user not logged in:', userError);
      return false;
    }

    // Delete the saved property record
    const { error } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', propertyId);

    if (error) {
      console.error('Error removing saved property:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in unsaveProperty:', error);
    return false;
  }
}

// Function to check if a property is saved by the current user
export async function isPropertySaved(propertyId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    // First, get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      // Not logged in, so definitely not saved
      return false;
    }

    // Check if property is saved
    const { data, error } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', propertyId)
      .single();

    if (error) {
      // If error is because no rows found, property is not saved
      if (error.code === 'PGRST116') {
        return false;
      }

      console.error('Error checking saved property:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error in isPropertySaved:', error);
    return false;
  }
}

// Function to get all saved properties for the current user
export async function getSavedProperties(): Promise<PropertyType[]> {
  const supabase = createClient();

  try {
    // First, get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error getting user or user not logged in:', userError);
      return [];
    }

    // Get saved property IDs for the user
    const { data: savedData, error: savedError } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', user.id);

    if (savedError) {
      console.error('Error fetching saved properties:', savedError);
      return [];
    }

    if (!savedData || savedData.length === 0) {
      return [];
    }

    // Get the actual property details
    const propertyIds = savedData.map(item => item.property_id);

    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*),
        property_amenities (
          amenity_id,
          amenities (name)
        )
      `)
      .in('id', propertyIds);

    if (propertiesError) {
      console.error('Error fetching saved property details:', propertiesError);
      return [];
    }

    // Transform the data
    return (properties as DbProperty[]).map(property => {
      const mainImage = property.property_images?.find((img: PropertyImage) => img.is_main) || property.property_images?.[0];

      return {
        id: property.id,
        title: property.title,
        address: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFeet: property.area_sqft,
        imageUrl: mainImage?.image_url || property.main_image_url || '',
        type: property.listing_type,
        featured: property.is_featured,
        tags: [],
        category: property.property_type.toLowerCase() as 'residential' | 'commercial' | 'industrial' | 'land',
        propertySubType: property.property_type,
        location: {
          city: property.city,
          state: property.state,
          neighborhood: '',
          pincode: ''
        },
        amenities: property.property_amenities?.map(item => item.amenities.name) || []
      };
    });
  } catch (error) {
    console.error('Unexpected error in getSavedProperties:', error);
    return [];
  }
}
