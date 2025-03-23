import React from "react";
import "./AboutUs.css";
import { Container } from "react-bootstrap";
import kyleImg from './assets/kyle.jpg';
import ryanImg from './assets/ryan.jpg';
import rayneImg from './assets/rayne.jpg';
import morrisImg from './assets/morris.jpg';

const team = [
    {
      name: "Kyle Duong",
      role: "Computer Science Student",
      description: "Mainly worked on Backend, Frontend development for MedTrack",
      image: kyleImg,
      github: "#",
      linkedin: "#",
    },
    {
      name: "Ryan Wong",
      role: "Computer Science Student",
      description: "Mainly worked on Backend, Frontend development for MedTrack",
      image: ryanImg,
      github: "#",
      linkedin: "#",
    },
    {
      name: "Rayne Desales",
      role: "Computer Science Student",
      description: "Mainly worked on UI/UX design, Figma, Frontend development",
      image: rayneImg,
      github: "#",
      linkedin: "#",
    },
    {
      name: "Morris Lam",
      role: "Computer Science Student",
      description: "Mainly worked on UI/UX design, Figma, Frontend development",
      image: morrisImg,
      github: "#",
      linkedin: "#",
    }
  ];

export default function AboutUsPage() {
  return (
    <Container fluid className="about-container">
      <div className="header">
        <h2>Behind the Team</h2>
        <p>
          Just some unemployed Computer Science students trying to make something
          useful for the world.
        </p>
      </div>
      <div className="team-grid">
        {team.map((member, index) => (
          <div key={index} className="member-card">
            <img src={member.image} alt={member.name} className="member-img" />
            <h5>{member.name}</h5>
            <a href="#" className="role-link">{member.role}</a>
            <p className="desc">{member.description}</p>
            <div className="social-icons">
              <a href={member.github}><img src="/icons/github.png" alt="GitHub" /></a>
              <a href={member.linkedin}><img src="/icons/linkedin.png" alt="LinkedIn" /></a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
