"use client";

import React, { useState, useMemo, useEffect, Fragment } from "react";
import { PropertyCard, PropertyType } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Building, Home, Briefcase, Minimize2, Filter, X, ChevronDown } from "lucide-react";
import { getProperties, getLocations, getAmenities } from "@/lib/api";
import { PropertyFilters } from "@/lib/db";

// Define interfaces for API responses
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

export default function PropertiesPage() {
  // State for all properties
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for locations and amenities
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allStates, setAllStates] = useState<string[]>([]);
  const [allAmenities, setAllAmenities] = useState<string[]>([]);

  // Basic filters
  const [activeType, setActiveType] = useState<'all' | 'sale' | 'rent'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]); // 0 to 10 crore
  const [bedroomsFilter, setBedroomsFilter] = useState<number | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Advanced filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubTypes, setSelectedSubTypes] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // UI states
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_high' | 'price_low'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage, setPropertiesPerPage] = useState(9);

  // Fetch properties, locations, and amenities on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch properties
        const propertiesData = await getProperties({});
        setProperties(propertiesData);

        // Fetch locations
        const locationsData = await getLocations();
        const cities = [...new Set(locationsData.map((loc: LocationType) => loc.city))];
        const states = [...new Set(locationsData.map((loc: LocationType) => loc.state))];
        setAllCities(cities as string[]);
        setAllStates(states as string[]);

        // Fetch amenities
        const amenitiesData = await getAmenities();
        setAllAmenities(amenitiesData.map((amenity: AmenityType) => amenity.name));

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);

        // Build filter object
        const filters: PropertyFilters = {};

        if (activeType !== 'all') {
          filters.type = activeType;
        }

        if (priceRange[0] > 0 || priceRange[1] < 100000000) {
          filters.minPrice = priceRange[0];
          filters.maxPrice = priceRange[1];
        }

        if (bedroomsFilter !== null) {
          filters.bedrooms = bedroomsFilter;
        }

        if (featuredOnly) {
          filters.featured = true;
        }

        if (selectedCategory) {
          filters.category = selectedCategory;
        }

        if (selectedSubTypes.length > 0) {
          filters.propertySubTypes = selectedSubTypes;
        }

        if (selectedState) {
          filters.state = selectedState;
        }

        if (selectedCity) {
          filters.city = selectedCity;
        }

        if (selectedAmenities.length > 0) {
          filters.amenities = selectedAmenities;
        }

        if (searchQuery.trim()) {
          filters.searchQuery = searchQuery.trim();
        }

        // Add sorting
        if (sortBy === 'price_high') {
          filters.sort = 'price';
          filters.order = 'desc';
        } else if (sortBy === 'price_low') {
          filters.sort = 'price';
          filters.order = 'asc';
        } else {
          filters.sort = 'createdAt';
          filters.order = 'desc';
        }

        // Fetch filtered properties
        const filteredProperties = await getProperties(filters);
        setProperties(filteredProperties);

      } catch (err) {
        console.error('Error applying filters:', err);
        setError('Failed to apply filters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [
    activeType,
    priceRange,
    bedroomsFilter,
    featuredOnly,
    selectedCategory,
    selectedSubTypes,
    selectedState,
    selectedCity,
    selectedAmenities,
    sortBy,
    searchQuery
  ]);

  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true);

      const filters: PropertyFilters = {
        searchQuery: searchQuery.trim()
      };

      if (activeType !== 'all') {
        filters.type = activeType;
      }

      const searchResults = await getProperties(filters);
      setProperties(searchResults);

    } catch (err) {
      console.error('Error searching properties:', err);
      setError('Failed to search properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset all filters
  const resetFilters = async () => {
    setActiveType('all');
    setPriceRange([0, 100000000]);
    setBedroomsFilter(null);
    setFeaturedOnly(false);
    setSelectedCategory(null);
    setSelectedSubTypes([]);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedAmenities([]);
    setSearchQuery("");
    setSortBy('newest');

    try {
      setLoading(true);
      const propertiesData = await getProperties({});
      setProperties(propertiesData);
    } catch (err) {
      console.error('Error resetting filters:', err);
      setError('Failed to reset filters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination data
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Count active filters
  const activeFiltersCount = [
    activeType !== 'all',
    priceRange[0] > 0 || priceRange[1] < 100000000,
    bedroomsFilter !== null,
    featuredOnly,
    selectedCategory !== null,
    selectedSubTypes.length > 0,
    selectedState !== null,
    selectedCity !== null,
    selectedAmenities.length > 0
  ].filter(Boolean).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-900 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Your Ideal Property</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl">
            Discover premium properties across India's most desirable locations with Estate Eminence Ventures
          </p>

          {/* Quick search bar */}
          <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center shadow-lg mb-4">
            <div className="flex-grow flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4 md:mb-0 md:mr-4">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by location, property name, or keyword"
                className="flex-grow bg-transparent border-none focus:outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Search Properties
            </Button>
          </div>

          {/* Property type tabs */}
          <Tabs defaultValue="all" value={activeType} className="w-full">
            <TabsList className="bg-blue-800 text-white">
              <TabsTrigger
                value="all"
                onClick={() => setActiveType('all')}
                className={`${activeType === 'all' ? 'bg-blue-600' : 'hover:bg-blue-700'} text-white`}
              >
                All Properties
              </TabsTrigger>
              <TabsTrigger
                value="sale"
                onClick={() => setActiveType('sale')}
                className={`${activeType === 'sale' ? 'bg-blue-600' : 'hover:bg-blue-700'} text-white`}
              >
                For Sale
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                onClick={() => setActiveType('rent')}
                className={`${activeType === 'rent' ? 'bg-blue-600' : 'hover:bg-blue-700'} text-white`}
              >
                For Rent
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Advanced filters toggle */}
          <div className="mb-4 md:mb-0">
            <Button
              variant="outline"
              onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
              className="flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white">{activeFiltersCount}</Badge>
              )}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isAdvancedFiltersOpen ? 'transform rotate-180' : ''}`} />
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="ml-2 text-sm"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'price_high' | 'price_low')}
              className="border rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Advanced filters panel */}
        {isAdvancedFiltersOpen && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <select
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full border rounded-md p-2 text-sm"
                    >
                      <option value="0">Min Price</option>
                      <option value="500000">₹5 Lac</option>
                      <option value="1000000">₹10 Lac</option>
                      <option value="2500000">₹25 Lac</option>
                      <option value="5000000">₹50 Lac</option>
                      <option value="10000000">₹1 Cr</option>
                      <option value="20000000">₹2 Cr</option>
                      <option value="50000000">₹5 Cr</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full border rounded-md p-2 text-sm"
                    >
                      <option value="100000000">Max Price</option>
                      <option value="1000000">₹10 Lac</option>
                      <option value="2500000">₹25 Lac</option>
                      <option value="5000000">₹50 Lac</option>
                      <option value="10000000">₹1 Cr</option>
                      <option value="20000000">₹2 Cr</option>
                      <option value="50000000">₹5 Cr</option>
                      <option value="100000000">₹10 Cr</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Property category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Category</label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategory(value === '' ? null : value);
                    setSelectedSubTypes([]);
                  }}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={bedroomsFilter === null ? '' : bedroomsFilter}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBedroomsFilter(value === '' ? null : parseInt(value));
                  }}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Location - State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={selectedState || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedState(value === '' ? null : value);
                    setSelectedCity(null); // Reset city when state changes
                  }}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">All States</option>
                  {allStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Location - City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCity(value === '' ? null : value);
                  }}
                  className="w-full border rounded-md p-2 text-sm"
                  disabled={!selectedState}
                >
                  <option value="">All Cities</option>
                  {allCities
                    .filter(city => !selectedState || properties.some(p =>
                      p.location.state === selectedState && p.location.city === city
                    ))
                    .map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))
                  }
                </select>
              </div>

              {/* Featured only */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featuredOnly"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="featuredOnly" className="ml-2 text-sm text-gray-700">
                  Featured Properties Only
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? (
              'Finding properties...'
            ) : properties.length === 0 ? (
              'No properties found. Try adjusting your filters.'
            ) : (
              `Found ${properties.length} properties matching your criteria`
            )}
          </p>
        </div>

        {/* Properties grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                <div className="bg-gray-200 h-5 rounded w-3/4 mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>
                <div className="bg-gray-200 h-10 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={resetFilters}>Try Again</Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow">
                  <Button
                    variant="outline"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-l-md"
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, i, arr) => (
                      <Fragment key={page}>
                        {i > 0 && arr[i - 1] !== page - 1 && (
                          <Button
                            variant="outline"
                            disabled
                            className="border-t border-b"
                          >
                            ...
                          </Button>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => paginate(page)}
                          className={`border-t border-b ${
                            currentPage === page ? "bg-blue-500 text-white" : ""
                          }`}
                        >
                          {page}
                        </Button>
                      </Fragment>
                    ))
                  }

                  <Button
                    variant="outline"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-r-md"
                  >
                    Next
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
