-- Create Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms DECIMAL(3,1) NOT NULL,
    area_sqft DECIMAL(10,2) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    listing_type VARCHAR(50) NOT NULL CHECK (listing_type IN ('sale', 'rent')),
    is_featured BOOLEAN DEFAULT false,
    main_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Property Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    icon_name VARCHAR(100)
);

-- Create Property-Amenities Junction Table
CREATE TABLE IF NOT EXISTS property_amenities (
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
);

-- Create Saved Properties Table
CREATE TABLE IF NOT EXISTS saved_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Create Property Inquiries Table
CREATE TABLE IF NOT EXISTS property_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create User Profile Extensions Table (extends the auth.users table)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(50),
    bio TEXT,
    is_agent BOOLEAN DEFAULT false,
    website VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS Policies
-- Enable RLS on tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Properties
CREATE POLICY "Properties are viewable by everyone"
ON properties FOR SELECT
USING (true);

-- RLS Policies for Property Images
CREATE POLICY "Property images are viewable by everyone"
ON property_images FOR SELECT
USING (true);

-- RLS Policies for Amenities
CREATE POLICY "Amenities are viewable by everyone"
ON amenities FOR SELECT
USING (true);

-- RLS Policies for Property Amenities
CREATE POLICY "Property amenities are viewable by everyone"
ON property_amenities FOR SELECT
USING (true);

-- RLS Policies for Saved Properties
CREATE POLICY "Users can view their own saved properties"
ON saved_properties FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
ON saved_properties FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved properties"
ON saved_properties FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for Property Inquiries
CREATE POLICY "Users can view their own inquiries"
ON property_inquiries FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create inquiries"
ON property_inquiries FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for User Profiles
CREATE POLICY "Users can view all profiles"
ON user_profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

-- Sample Amenities Data
INSERT INTO amenities (name, icon_name) VALUES
('Air Conditioning', 'air-conditioning'),
('Swimming Pool', 'pool'),
('Gym', 'gym'),
('Wi-Fi', 'wifi'),
('Parking', 'parking'),
('Security System', 'security'),
('Balcony', 'balcony'),
('Garden', 'garden'),
('Elevator', 'elevator'),
('Fireplace', 'fireplace'),
('Washing Machine', 'laundry'),
('Dishwasher', 'dishwasher'),
('Furnished', 'furniture'),
('Pets Allowed', 'pet'),
('TV', 'tv')
ON CONFLICT (name) DO NOTHING;

-- Create a function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add RLS for storage
-- First create a bucket for property images if not exists
-- INSERT INTO storage.buckets (id, name) VALUES ('property-images', 'property-images') ON CONFLICT DO NOTHING;

-- CREATE POLICY "Property images are viewable by everyone"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'property-images');

-- CREATE POLICY "Authenticated users can upload property images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Users can update their own property images"
-- ON storage.objects FOR UPDATE
-- USING (bucket_id = 'property-images' AND auth.uid() = owner);
