import React from 'react';
import { Pill } from 'lucide-react';
import { Button} from 'react-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbarBrand">
          <Pill className="pill-icon" />
          <span style={{ color: "#B997EA" }}>Med</span>Track
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="navbarLink">Home</Link>
        <Link to="/about" className="navbarLink">Our Team</Link>
        <Link to="/services" className="navbarLink">Our Goal</Link>
      </div>
      
      <div className="navbar-right">
        <Link to="/signup" className="auth-link">Sign Up</Link>
        <div className="divider">/</div>
        <Link to="/signin" className="join-btn">Join Us</Link>
      </div>
    </nav>
  );
};


export default NavBar;