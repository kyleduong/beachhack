import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Landing.css'; 
import Features from './Features'; 
import heroImage from "./Hero-Image.png"
import Mission from './Mission';
import FeaturesHighlights from './FeaturesHighlights';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import Dashboard from './Dashboard';

const Landing = () => {
  return (
    <div className="hero-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
            <h1 className="hero-title">
            <span>Take Control</span>
            <span> of Your Health, Effortlessly.</span>
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
              <h2 className="stat-number">98%</h2>
              <p className="stat-description">Customer Satisfaction</p>
            </div>
            
            <div className="stat-item">
              <h2 className="stat-number">3x</h2>
              <p className="stat-description">Faster Prescription<br />Tracking</p>
            </div>
            
            <div className="stat-item">
              <h2 className="stat-number">90%</h2>
              <p className="stat-description">Fewer Missed Doses</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <img src={heroImage} alt="Elderly couple enjoying life outdoors" />
        </div>
      </div>
      <Features/>
      <Mission/>
      <FeaturesHighlights/>
      <Footer/>
    </div>
  );
};

export default Landing;