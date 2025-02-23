import React, { useEffect, useState } from 'react';
import { Building2, Home, Key, MapPin, Phone, Mail, Users2, Briefcase, BarChart, Shield } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Residential Properties",
      description: "Find your dream home with our extensive residential property listings"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Commercial Real Estate",
      description: "Premium office spaces and retail locations for your business"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Property Management",
      description: "Complete property management solutions for landlords and tenants"
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: "Investment Advisory",
      description: "Expert guidance for real estate investments and portfolio management"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Legal Services",
      description: "Comprehensive legal support for all real estate transactions"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Market Analysis",
      description: "Detailed market insights and property valuation services"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl font-bold text-white mb-6">
                Estate Eminence Ventures
              </h1>
              <p className="text-xl text-white mb-8">
                Your Premier Real Estate Partner in India
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Explore Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trusted Excellence</h3>
              <p className="text-gray-600">20+ years of experience in Indian real estate market</p>
            </div>
            <div className="text-center">
              <Users2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-gray-600">Professional and dedicated team of real estate experts</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pan India Presence</h3>
              <p className="text-gray-600">Operating in all major cities across India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 mr-3" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 mr-3" />
                <span>contact@estateeminence.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span>123 Business District, Mumbai, India</span>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                ></textarea>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;