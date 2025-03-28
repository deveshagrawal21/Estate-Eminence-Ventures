'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { PropertyCard, PropertyType } from '@/components/property-card';
import { getPropertyById, getAllProperties } from '@/utils/supabase/properties';
import { FaRupeeSign, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaShareAlt, FaCar, FaSwimmingPool, FaWifi, FaTree, FaShieldAlt, FaDumbbell } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';

export default function PropertyDetailPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [similarProperties, setSimilarProperties] = useState<PropertyType[]>([]);

  const amenityIcons: Record<string, JSX.Element> = {
    'Swimming Pool': <FaSwimmingPool className="text-blue-600" />,
    'Parking': <FaCar className="text-blue-600" />,
    'Wifi': <FaWifi className="text-blue-600" />,
    'Garden': <FaTree className="text-blue-600" />,
    'Security': <FaShieldAlt className="text-blue-600" />,
    'Gym': <FaDumbbell className="text-blue-600" />,
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!propertyId) {
        setError('Property ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const propertyData = await getPropertyById(propertyId);

        if (!propertyData) {
          setError('Property not found');
          setLoading(false);
          return;
        }

        setProperty(propertyData);

        // Fetch similar properties
        const similarProps = await getAllProperties({
          category: propertyData.category,
          limit: 3,
          exclude: [propertyId]
        });

        setSimilarProperties(similarProps);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const formatPrice = (price: number, type: 'sale' | 'rent'): string => {
    if (type === 'sale') {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} Lac`;
      }
    }

    // For rental properties or other cases
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleScheduleViewing = () => {
    // Navigate to contact page with property info in query params
    window.location.href = `/contact?service=property&propertyId=${propertyId}`;
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div>
        <NavBar />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Property Not Found</h2>
            <p className="text-gray-600 mb-8">{error || 'The property you are looking for does not exist or has been removed.'}</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock property images array (in real app, these would come from the database)
  const propertyImages = [
    property.imageUrl,
    'https://ext.same-assets.com/2675109532/4567892354.jpg',
    'https://ext.same-assets.com/2675109532/6572465725.jpg',
    'https://ext.same-assets.com/2675109532/7892134567.jpg',
    'https://ext.same-assets.com/2675109532/3456789213.jpg'
  ];

  // Mock property description (in real app, this would come from the database)
  const propertyDescription = `
    This exceptional ${property.category === 'residential' ? 'home' : 'property'} is nestled in the heart of ${property.location.city}, offering unparalleled access to the city's finest amenities while providing a serene escape from the urban hustle.

    Spanning ${property.squareFeet} square feet, the property features ${property.bedrooms} spacious bedrooms and ${property.bathrooms} elegantly designed bathrooms. The thoughtfully planned layout maximizes space and natural light, creating an inviting atmosphere throughout.

    ${property.category === 'residential' ?
      `The modern kitchen is equipped with high-end appliances and ample storage, perfect for culinary enthusiasts. The living areas are designed for both comfort and entertainment, with premium finishes that exude sophistication.` :
      `This property is ideal for business operations, offering flexible spaces that can be customized to suit various needs. The strategic location ensures excellent visibility and accessibility for clients and employees alike.`
    }

    Located in ${property.location.neighborhood || property.location.city}, residents will enjoy proximity to schools, shopping centers, restaurants, and parks. The well-established neighborhood offers a perfect blend of convenience and community.

    ${property.type === 'sale' ?
      `This property represents an excellent investment opportunity in one of ${property.location.city}'s most sought-after areas.` :
      `Available for immediate occupancy, this rental property won't remain on the market long.`
    }

    Schedule a viewing today to experience the exceptional quality and lifestyle this property offers.
  `;

  // Mock amenities (in real app, these would come from the database)
  const amenities = property.amenities || [
    'Swimming Pool',
    'Parking',
    'Wifi',
    'Garden',
    'Security',
    'Gym'
  ];

  return (
    <div>
      <NavBar />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/properties" className="hover:text-blue-600">Properties</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{property.title}</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <span>{property.location.neighborhood ? `${property.location.neighborhood}, ` : ''}{property.location.city}, {property.location.state}</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-2">
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                {property.featured && (
                  <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatPrice(property.price, property.type)}
                {property.type === 'rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
              </div>
              <div className="text-sm text-gray-500">
                {(property.price / property.squareFeet).toFixed(0)} per sqft
              </div>
            </div>
          </div>
        </div>

        {/* Property Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-3">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={propertyImages[selectedImage]}
                alt={property.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {propertyImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`relative w-full h-[95px] rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-600' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img}
                  alt={`Property view ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Overview</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaBed className="text-blue-600 text-2xl" />
                  </div>
                  <div className="text-sm text-gray-500">Bedrooms</div>
                  <div className="font-bold text-lg">{property.bedrooms}</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaBath className="text-blue-600 text-2xl" />
                  </div>
                  <div className="text-sm text-gray-500">Bathrooms</div>
                  <div className="font-bold text-lg">{property.bathrooms}</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaRulerCombined className="text-blue-600 text-2xl" />
                  </div>
                  <div className="text-sm text-gray-500">Area</div>
                  <div className="font-bold text-lg">{property.squareFeet} sqft</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaRupeeSign className="text-blue-600 text-2xl" />
                  </div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-bold text-lg">{formatPrice(property.price, property.type)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-medium">Property Type:</span>{' '}
                  <span className="capitalize">{property.category}</span>
                  {property.propertySubType && ` - ${property.propertySubType}`}
                </div>

                <div>
                  <span className="font-medium">Location:</span>{' '}
                  <span>{property.location.neighborhood ? `${property.location.neighborhood}, ` : ''}{property.location.city}, {property.location.state}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>

              <div className="whitespace-pre-line text-gray-600">
                {propertyDescription}
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6">Features & Amenities</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3">
                      {amenityIcons[amenity] || <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Location</h2>

              <div className="h-80 bg-gray-100 rounded-lg mb-4">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${property.location.city}, ${property.location.state}`)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">Nearby Places</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>Schools: within 1 km</li>
                  <li>Shopping Malls: within 2 km</li>
                  <li>Hospital: within 3 km</li>
                  <li>Public Transportation: within 500 m</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Agent/Contact Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>

              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://ext.same-assets.com/2675109532/9874563219.jpg"
                    alt="Agent"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div className="font-medium">Vikram Sharma</div>
                  <div className="text-sm text-gray-500">Senior Property Advisor</div>
                  <div className="text-sm text-blue-600">+91 98765 43210</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Button
                  onClick={handleScheduleViewing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Schedule Viewing
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600"
                  onClick={() => window.location.href = `mailto:sales@estateeminence.com?subject=Inquiry about ${property.title}&body=Hello, I am interested in this property: ${property.title} (ID: ${property.id}). Please provide more information.`}
                >
                  Send Email Inquiry
                </Button>
              </div>

              <div className="flex justify-center space-x-4 border-t pt-4">
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <FaHeart className="mr-1" /> Save
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <FaShareAlt className="mr-1" /> Share
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <LuExternalLink className="mr-1" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
