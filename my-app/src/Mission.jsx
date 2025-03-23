import React from 'react';
import './Mission.css';
import xMark from './X Mark.png';

const Mission = () => {
  return (
    <div className="mission-container">
      <div className="mission-content">
        <img src={xMark} alt="X Mark" className="x-mark" />
        
        <h2 className="mission-title instrument-sans-bold">
          How we help you stay on<br />
          track with Your medications
        </h2>
        
        <p className="mission-description inter-light-text">
          Track your prescriptions, set reminders, and monitor side effects—all<br />
          in one place to keep you informed and on schedule.
        </p>
      </div>
    </div>
  );
};

export default Mission;