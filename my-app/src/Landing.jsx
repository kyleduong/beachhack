import React, { useEffect, useState } from 'react';
import './Landing.css';
import Features from './Features';
import Mission from './Mission';
import FeaturesHighlights from './FeaturesHighlights';
import Dashboard from './Dashboard';
import Footer from './Footer';
import heroImage from "./Hero-Image.png";

import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { motion } from "motion/react";

const Landing = () => {
  // State for all stats
  const [stats, setStats] = useState({
    satisfaction: 0,
    speed: 0,
    doses: 0
  });

  useEffect(() => {
    const targets = {
      satisfaction: 98,
      speed: 3,
      doses: 90
    };
    const duration = 1500;
    const startTime = Date.now();

    const animateNumbers = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);


      const newStats = {
        satisfaction: Math.round(progress * targets.satisfaction),
        speed: Math.round(progress * targets.speed),
        doses: Math.round(progress * targets.doses)
      };

      setStats(newStats);

      if (progress < 1) {
        requestAnimationFrame(animateNumbers);
      }
    };

    animateNumbers();
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Take control of your <br /> Health, Effortlessly.
          </h1>
          <p className="hero-description">
            Track medications, manage symptoms,<br />
            and stay on top of your prescriptions —<br />
            all in one place.
          </p>

          <div className="hero-buttons">
            <a href="#" className="join-now-btn">
              Join Now <ArrowRight size={16} />
            </a>
            <Link to="/dashboard" className="dashboard-btn">
              Go to Dashboard
            </Link>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <h2 className="stat-number">{stats.satisfaction}%</h2>
              <p className="stat-description">Customer Satisfaction</p>
            </div>

            <div className="stat-item">
              <h2 className="stat-number">{stats.speed}x</h2>
              <p className="stat-description">Faster Prescription<br />Tracking</p>
            </div>

            <div className="stat-item">
              <h2 className="stat-number">{stats.doses}%</h2>
              <p className="stat-description">Fewer Missed Doses</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Elderly couple enjoying life outdoors" />
        </div>
      </div>
      <Features />
      <Mission />
      <FeaturesHighlights />
      <Footer />
    </div>
  );
};

export default Landing;
