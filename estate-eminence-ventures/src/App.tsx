import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, PhoneCall } from 'lucide-react';
import './global.css';

const App: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1 },
    },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.8, duration: 0.8 },
    },
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">Estate Eminence Ventures</div>
        <nav>
          <a href="#home">
            <Home /> Home
          </a>
          <a href="#services">
            <Briefcase /> Services
          </a>
          <a href="#contact">
            <PhoneCall /> Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={textVariants}>
            Welcome to Estate Eminence Ventures
          </motion.h1>
          <motion.p variants={textVariants}>
            Your trusted partner in real estate solutions.
          </motion.p>
          <motion.button
            className="cta-button"
            variants={textVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Properties
          </motion.button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <motion.div
            className="service-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Property Management</h3>
            <p>We manage your properties with care and efficiency.</p>
          </motion.div>
          <motion.div
            className="service-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Real Estate Consulting</h3>
            <p>Expert advice to help you make informed decisions.</p>
          </motion.div>
          <motion.div
            className="service-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Buy & Sell Properties</h3>
            <p>Find your dream home or sell your property hassle-free.</p>
          </motion.div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section id="listings" className="property-listings-section">
        <h2>Featured Properties</h2>
        <div className="properties-grid">
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <img src="/assets/images/property1.jpg" alt="Property 1" />
            <h3>Luxury Villa</h3>
            <p>$1.2M | 4 Beds | 3 Baths</p>
          </motion.div>
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <img src="/assets/images/property2.jpg" alt="Property 2" />
            <h3>Modern Apartment</h3>
            <p>$800K | 2 Beds | 2 Baths</p>
          </motion.div>
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <img src="/assets/images/property3.jpg" alt="Property 3" />
            <h3>Beachfront House</h3>
            <p>$2.5M | 5 Beds | 4 Baths</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <h3>Contact Us</h3>
          <p>Email: info@estateeminence.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Real Estate Ave, City, Country</p>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;