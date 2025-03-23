import React from 'react';
import './Features.css';
import calIcon from './Cal Icon 1.png';
import bellIcon from './Bell Icon 2.png';
import activityIcon from './Activity 3.png';

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-header">
        <h2 className="features-title instrument-sans-bold">
          Stay in Control of Your  <span className="highlight">&nbsp;Medications </span> &nbsp;with Ease
        </h2>
 
        <p className="features-description inter-light-text">
          Managing prescriptions should be simple. Our app tracks your medications,
          schedules, and interactions in one place, with smart reminders and side effect
          monitoring to keep you informed and in control.
        </p>
      </div>

      <div className="features-cards">
        <div className="feature-card">
          <div className="card-icon">
            <img src={calIcon} alt="Calendar with checkmark" />
          </div>
          <h3 className="card-title instrument-sans-bold">Track Your Prescriptions</h3>
          <p className="card-description inter-light-text">
            Never lose track of your medications again. Our system logs all your prescriptions,
            including start dates, refill schedules, and expiration dates. Get notified when it's time
            to renew, so you're never caught off guard.
          </p>
        </div>

        <div className="feature-card">
          <div className="card-icon">
            <img src={bellIcon} alt="Notification bell" />
          </div>
          <h3 className="card-title instrument-sans-bold">Drugs Interaction</h3>
          <p className="card-description inter-light-text">
            Worried about drug interactions? Our app cross-checks your prescriptions and alerts you
            if any medications may have adverse effects when taken together. Stay safe with real-time
            notifications that keep you informed.
          </p>
        </div>

        <div className="feature-card">
          <div className="card-icon">
            <img src={activityIcon} alt="Heart rate monitor" />
          </div>
          <h3 className="card-title instrument-sans-bold">Side Effect Monitoring</h3>
          <p className="card-description inter-light-text">
            Not sure if your medication is causing side effects? Track health changes to identify
            concerns early and consult your provider with better data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;