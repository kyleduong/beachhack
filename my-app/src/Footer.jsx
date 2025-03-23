import React from 'react';
import { Pill } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <Pill size={28} />
          <span className="logo-text">
            <span className="logo-med">Med</span>Track
          </span>
        </div>
        
        <div className="footer-team">
          <h3 className="team-title">Team</h3>
          <div className="team-members">
            <div className="team-column">
              <p className="team-member">Morris Lam</p>
              <p className="team-member">Ryan Wong</p>
            </div>
            <div className="team-column">
              <p className="team-member">Rayne DeSales</p>
              <p className="team-member">Kyle Duong</p>
            </div>
          </div>
        </div>
        
        <div className="footer-hackathon">
          <p className="hackathon-text">BeachHacks 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;