import { useEffect, useState } from 'react';
import './styles/Hero.css';

const Hero = () => {
  const [dateTime, setDateTime] = useState('2025-03-11 05:56:04');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      <div className="hero__content">
        <div className="hero__title-container">
          <h1 className="hero__title">
            <span className="hero__title-line">Estate</span>
            <span className="hero__title-line">Eminence</span>
            <span className="hero__title-line">Ventures</span>
          </h1>
          <p className="hero__subtitle">
            Redefining Luxury Real Estate Excellence
          </p>
        </div>

        <div className="hero__stats">
          <div className="hero__stat-box">
            <div className="hero__stat-label">Current Time (UTC)</div>
            <div className="hero__stat-value">{dateTime}</div>
          </div>
          <div className="hero__stat-box">
            <div className="hero__stat-label">Authorized User</div>
            <div className="hero__stat-value">deveshagrawal21</div>
          </div>
        </div>

        <div className="hero__cta">
          <button className="hero__button hero__button--primary">
            Explore Properties
          </button>
          <button className="hero__button hero__button--secondary">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;