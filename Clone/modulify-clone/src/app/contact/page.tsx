'use client';

import { useState } from 'react';
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function ContactPage() {
  const searchParams = useSearchParams();

  // Set default service from URL if available
  const initialService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: initialService || 'general',
    propertyInterest: initialService === 'buying' ? 'buying' : initialService === 'selling' ? 'selling' : initialService === 'investment' ? 'investment' : '',
    budget: '',
    location: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'property', label: 'Property Specific' },
    { value: 'investment', label: 'Investment Opportunities' },
    { value: 'services', label: 'Real Estate Services' },
    { value: 'career', label: 'Career Opportunities' }
  ];

  const propertyInterests = [
    { value: 'buying', label: 'Buying a Property' },
    { value: 'selling', label: 'Selling a Property' },
    { value: 'renting', label: 'Renting a Property' },
    { value: 'investment', label: 'Property Investment' }
  ];

  const budgetRanges = [
    { value: '<5000000', label: 'Under ₹50 Lakh' },
    { value: '5000000-10000000', label: '₹50 Lakh - ₹1 Crore' },
    { value: '10000000-20000000', label: '₹1 Crore - ₹2 Crore' },
    { value: '20000000-50000000', label: '₹2 Crore - ₹5 Crore' },
    { value: '>50000000', label: 'Above ₹5 Crore' }
  ];

  const locations = [
    { value: 'delhi-ncr', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Valid 10-digit phone number is required';
    }

    if (formData.inquiryType === 'property' && !formData.propertyInterest) {
      errors.propertyInterest = 'Please select your property interest';
    }

    if ((formData.inquiryType === 'property' || formData.inquiryType === 'investment') && !formData.budget) {
      errors.budget = 'Please select your budget range';
    }

    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        propertyInterest: '',
        budget: '',
        location: '',
        message: ''
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors({
        form: 'There was an error submitting your form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Have questions about our properties or services? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <FaBuilding size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Head Office</h3>
                <p className="text-gray-600">
                  Estate Eminence Towers<br />
                  #123, Brigade Road<br />
                  Bangalore, Karnataka 560001
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <FaPhone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Phone</h3>
                <p className="text-gray-600">
                  General: +91 80 4567 8900<br />
                  Sales: +91 80 4567 8901<br />
                  Support: +91 80 4567 8902
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-gray-600">
                  Info: info@estateeminence.com<br />
                  Sales: sales@estateeminence.com<br />
                  Support: support@estateeminence.com
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {/* Regional Offices */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-2" /> Regional Offices
              </h3>
              <ul className="space-y-4">
                <li>
                  <div className="font-medium">Delhi NCR</div>
                  <div className="text-gray-600 text-sm">Plot 45, Sector 32, Gurgaon</div>
                </li>
                <li>
                  <div className="font-medium">Mumbai</div>
                  <div className="text-gray-600 text-sm">Bandra Kurla Complex, Mumbai</div>
                </li>
                <li>
                  <div className="font-medium">Hyderabad</div>
                  <div className="text-gray-600 text-sm">HITEC City, Hyderabad</div>
                </li>
              </ul>
            </div>

            {/* Business Hours */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaClock className="text-blue-600 mr-2" /> Business Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="col-span-1 md:col-span-4 lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Find Us</h3>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9940329513324!2d77.5988033!3d12.9762635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBrigade%20Road%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1653395799318!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>

              {formSubmitted ? (
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-green-600 text-4xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You for Reaching Out!</h3>
                  <p className="text-gray-600 mb-4">
                    Your message has been successfully sent. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formErrors.form && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                      {formErrors.form}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 pb-2 border-b">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="10-digit mobile number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 pb-2 border-b">Inquiry Details</h3>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="inquiryType">
                        Inquiry Type*
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    {formData.inquiryType === 'property' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="propertyInterest">
                            Property Interest*
                          </label>
                          <select
                            id="propertyInterest"
                            name="propertyInterest"
                            value={formData.propertyInterest}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-md ${formErrors.propertyInterest ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option value="">Select Interest</option>
                            {propertyInterests.map(interest => (
                              <option key={interest.value} value={interest.value}>{interest.label}</option>
                            ))}
                          </select>
                          {formErrors.propertyInterest && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.propertyInterest}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                            Budget Range*
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-md ${formErrors.budget ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option value="">Select Budget</option>
                            {budgetRanges.map(range => (
                              <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                          </select>
                          {formErrors.budget && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.inquiryType === 'investment' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                            Investment Budget*
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-md ${formErrors.budget ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option value="">Select Budget</option>
                            {budgetRanges.map(range => (
                              <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                          </select>
                          {formErrors.budget && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                            Preferred Location
                          </label>
                          <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select Location</option>
                            {locations.map(loc => (
                              <option key={loc.value} value={loc.value}>{loc.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                        Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full p-2 border rounded-md ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
