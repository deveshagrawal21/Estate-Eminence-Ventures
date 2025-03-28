import { PropertyType } from "@/components/property-card";

export const properties: PropertyType[] = [
  {
    id: "prop-001",
    title: "Modern Waterfront Apartment",
    address: "123 Marine Drive, Mumbai, Maharashtra 400020",
    price: 25000000, // 2.5 Crore INR
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2750,
    imageUrl: "https://ext.same-assets.com/2675109532/2624546329.jpg",
    type: "sale",
    featured: true,
    tags: ["Waterfront", "Luxury", "Sea View", "Mumbai"],
    category: "residential",
    propertySubType: "Apartment",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      neighborhood: "Marine Drive",
      pincode: "400020"
    },
    amenities: ["Swimming Pool", "Gym", "24x7 Security", "Power Backup", "Parking"]
  },
  {
    id: "prop-002",
    title: "Executive Condo in Indiranagar",
    address: "456 100 Feet Road, Indiranagar, Bangalore 560038",
    price: 15000000, // 1.5 Crore INR
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1650,
    imageUrl: "https://ext.same-assets.com/2675109532/1368969264.jpg",
    type: "sale",
    tags: ["Condo", "Prime Location", "Security"],
    category: "residential",
    propertySubType: "Flat",
    location: {
      city: "Bangalore",
      state: "Karnataka",
      neighborhood: "Indiranagar",
      pincode: "560038"
    },
    amenities: ["Club House", "Car Parking", "Children's Play Area", "Gated Community"]
  },
  {
    id: "prop-003",
    title: "Luxury Golf View Apartment",
    address: "789 DLF Golf Course Road, Gurgaon, Haryana 122002",
    price: 85000, // 85,000 INR monthly rent
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1450,
    imageUrl: "https://ext.same-assets.com/2675109532/3593124142.jpg",
    type: "rent",
    tags: ["Golf View", "Renovated", "Pet Friendly"],
    category: "residential",
    propertySubType: "Apartment",
    location: {
      city: "Gurgaon",
      state: "Haryana",
      neighborhood: "DLF Golf Course Road",
      pincode: "122002"
    },
    amenities: ["Golf Course", "Clubhouse", "Swimming Pool", "Gym", "Tennis Court"]
  },
  {
    id: "prop-004",
    title: "Heritage Haveli in Jaipur",
    address: "1234 Civil Lines, Jaipur, Rajasthan 302006",
    price: 42500000, // 4.25 Crore INR
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    imageUrl: "https://ext.same-assets.com/2675109532/3192401050.jpg",
    type: "sale",
    featured: true,
    tags: ["Heritage", "Historic", "Garden"],
    category: "residential",
    propertySubType: "Haveli",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      neighborhood: "Civil Lines",
      pincode: "302006"
    },
    amenities: ["Garden", "Courtyard", "Heritage Architecture", "Terrace", "Staff Quarters"]
  },
  {
    id: "prop-005",
    title: "Modern HSR Layout Apartment",
    address: "555 HSR Layout, Bangalore, Karnataka 560102",
    price: 45000, // 45,000 INR monthly rent
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 1100,
    imageUrl: "https://ext.same-assets.com/2675109532/2325675781.jpg",
    type: "rent",
    tags: ["Modern", "Tech Hub", "Open Concept"],
    category: "residential",
    propertySubType: "Studio Apartment",
    location: {
      city: "Bangalore",
      state: "Karnataka",
      neighborhood: "HSR Layout",
      pincode: "560102"
    },
    amenities: ["High-Speed Internet", "Gym", "Rooftop Garden", "EV Charging"]
  },
  {
    id: "prop-006",
    title: "Family Villa in Banjara Hills",
    address: "321 Banjara Hills, Hyderabad, Telangana 500034",
    price: 32000000, // 3.2 Crore INR
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3100,
    imageUrl: "https://ext.same-assets.com/2675109532/3368295814.jpg",
    type: "sale",
    tags: ["Family", "Yard", "Remodeled"],
    category: "residential",
    propertySubType: "Villa",
    location: {
      city: "Hyderabad",
      state: "Telangana",
      neighborhood: "Banjara Hills",
      pincode: "500034"
    },
    amenities: ["Private Pool", "Garden", "Home Theater", "Smart Home", "Solar Panels"]
  },
  {
    id: "prop-007",
    title: "Cozy South Delhi Apartment",
    address: "2222 Greater Kailash, New Delhi 110048",
    price: 65000, // 65,000 INR monthly rent
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    imageUrl: "https://ext.same-assets.com/2675109532/2983204701.jpg",
    type: "rent",
    tags: ["South Delhi", "Quiet", "Near Park"],
    category: "residential",
    propertySubType: "Apartment",
    location: {
      city: "New Delhi",
      state: "Delhi",
      neighborhood: "Greater Kailash",
      pincode: "110048"
    },
    amenities: ["24x7 Security", "Parking", "Park View", "Modular Kitchen"]
  },
  {
    id: "prop-008",
    title: "Premium Commercial Space in BKC",
    address: "123 Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    price: 90000000, // 9 Crore INR
    bedrooms: 0,
    bathrooms: 4,
    squareFeet: 5800,
    imageUrl: "https://ext.same-assets.com/2675109532/1502394857.jpg",
    type: "sale",
    featured: true,
    tags: ["Commercial", "Premium", "Corporate"],
    category: "commercial",
    propertySubType: "Office Space",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      neighborhood: "Bandra Kurla Complex",
      pincode: "400051"
    },
    amenities: ["Meeting Rooms", "Reception Area", "Server Room", "Cafeteria", "Parking"]
  },
  {
    id: "prop-009",
    title: "Trendy Koramangala Apartment",
    address: "777 Koramangala 4th Block, Bangalore 560034",
    price: 9500000, // 95 Lakh INR
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    imageUrl: "https://ext.same-assets.com/2675109532/1968475013.jpg",
    type: "sale",
    tags: ["Koramangala", "Hip", "Restaurants"],
    category: "residential",
    propertySubType: "Apartment",
    location: {
      city: "Bangalore",
      state: "Karnataka",
      neighborhood: "Koramangala",
      pincode: "560034"
    },
    amenities: ["Gym", "Playground", "Visitor Parking", "Community Hall"]
  },
  {
    id: "prop-010",
    title: "Hill View Apartment in Powai",
    address: "888 Hiranandani Gardens, Powai, Mumbai 400076",
    price: 55000, // 55,000 INR monthly rent
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1050,
    imageUrl: "https://ext.same-assets.com/2675109532/1572983401.jpg",
    type: "rent",
    tags: ["Lake View", "Modern", "Parking"],
    category: "residential",
    propertySubType: "Apartment",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      neighborhood: "Powai",
      pincode: "400076"
    },
    amenities: ["Lake View", "Jogging Track", "Children's Play Area", "Gym"]
  },
  {
    id: "prop-011",
    title: "Industrial Factory Space in Manesar",
    address: "432 HSIIDC Industrial Area, Manesar, Haryana 122051",
    price: 21000000, // 2.1 Crore INR
    bedrooms: 0,
    bathrooms: 4,
    squareFeet: 8500,
    imageUrl: "https://ext.same-assets.com/2675109532/2067845910.jpg",
    type: "sale",
    tags: ["Industrial", "Factory", "Manufacturing"],
    category: "industrial",
    propertySubType: "Factory",
    location: {
      city: "Manesar",
      state: "Haryana",
      neighborhood: "HSIIDC Industrial Area",
      pincode: "122051"
    },
    amenities: ["Loading Dock", "High Power Supply", "Security", "Worker Facilities", "Parking"]
  },
  {
    id: "prop-012",
    title: "Agricultural Land in Karjat",
    address: "1919 Karjat-Murbad Road, Karjat, Maharashtra 410201",
    price: 16500000, // 1.65 Crore INR
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 43560, // 1 acre in sq ft
    imageUrl: "https://ext.same-assets.com/2675109532/2357834019.jpg",
    type: "sale",
    tags: ["Agricultural", "Farmland", "Investment"],
    category: "land",
    propertySubType: "Agricultural Land",
    location: {
      city: "Karjat",
      state: "Maharashtra",
      neighborhood: "Karjat-Murbad Road",
      pincode: "410201"
    },
    amenities: ["Water Source", "Road Access", "Electricity Connection", "Fertile Soil"]
  }
];
