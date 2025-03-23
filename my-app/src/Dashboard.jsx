import React from "react";
import "./Dashboard.css";

export default function MedTrackDashboard() {
  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="logo">MedTrack</div>
        <div className="nav-links">
          <span>Home</span>
          <span>About Us</span>
          <span>Our Goal</span>
          <span>Sign Up</span>
        </div>
        <div className="join-button">Join Us</div>
      </div>

      {/* Greeting */}
      <div className="user-greeting">
        <div className="greeting-text">Good Morning, Lebron!</div>
        <div className="date-text">December 31, 20XX</div>
      </div>

      {/* Medication Section */}
      <div className="medication-section">
        <h2>Today’s Medications:</h2>

        <div className="med-card">
          <p>Ibuprofen</p>
          <p>2 pills</p>
          <p>2:30 P.M</p>
          <p>Status 🟨 (Upcoming)</p>
        </div>

        <div className="med-card">
          <p>Ache Cream</p>
          <p>6 mL</p>
          <p>12:05 P.M</p>
          <p>Status 🟩 (Taken)</p>
        </div>

        <div className="med-card">
          <p>Pepto Bismol</p>
          <p>30 mL</p>
          <p>8:00 A.M</p>
          <p>Status 🟥 (Missed)</p>
        </div>

        <div className="percentage-bar">
          <div className="progress-fill"></div>
          <span className="progress-text">Percentage Completed: 27%</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="symptom-log">
          <h3>Any New Symptoms Occur?</h3>
          <p>Log them here for your doctor to see.</p>
        </div>

        <div className="reminder-tab">
          <h3>REMINDER:</h3>
          <p>You have <strong>2</strong> remaining medications needed to be taken</p>
          <h4>Upcoming Medications</h4>
          <ul>
            <li>1/31: Viagra</li>
            <li>2/20: Begin Ozempic</li>
          </ul>
        </div>

        <div className="medical-history">
          <h3>Medical History</h3>
          <ul>
            <li>12/31: Tylenol</li>
            <li>12/24: Mustard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
