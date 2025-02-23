import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, PhoneCall, MapPin, Mail } from 'lucide-react';
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

      {/* Featured Properties Section */}
      <section id="properties" className="property-listings-section">
        <h2>Featured Properties</h2>
        <div className="properties-grid">
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Luxury Villa</h3>
            <p>$1.2M | 4 Beds | 3 Baths</p>
          </motion.div>
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Modern Apartment</h3>
            <p>$800K | 2 Beds | 2 Baths</p>
          </motion.div>
          <motion.div
            className="property-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Beachfront House</h3>
            <p>$2.5M | 5 Beds | 4 Baths</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <motion.div
            className="testimonial-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <p>
              "Estate Eminence Ventures helped me find my dream home. Their team is professional and reliable."
            </p>
            <h4>- John Doe</h4>
          </motion.div>
          <motion.div
            className="testimonial-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <p>
              "I highly recommend their property management services. They made everything seamless!"
            </p>
            <h4>- Jane Smith</h4>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <MapPin />
            <p>123 Real Estate Ave, City, Country</p>
          </div>
          <div className="contact-item">
            <PhoneCall />
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="contact-item">
            <Mail />
            <p>info@estateeminence.com</p>
          </div>
        </div>
        <form className="contact-form">
          <h3>Send Us a Message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={5} required></textarea>
          <button type="submit" className="cta-button">
            Submit
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Estate Eminence Ventures</h3>
          <p>&copy; 2023. All rights reserved.</p>
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