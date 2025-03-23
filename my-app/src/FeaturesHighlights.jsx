import React from 'react';
import './FeaturesHighlights.css';
import featureImage1 from './featureImage1.png';
import featureImage2 from './featureImage2.png';

const FeaturesHighlights = () => {
  return (
    <div className="feature-highlights-container">
      <div className="feature-highlights-content">
        <div className="feature-item">
          <div className="feature-image">
            <img src={featureImage1} alt="Person using laptop and mobile phone" />
          </div>
          <div className="feature-text">
            <h3 className="feature-title instrument-sans-bold">Easily Add Your Prescription</h3>
            <p className="feature-description inter-light-text">
              Simply enter your prescription information into the app. Add details like the medication name, 
              dosage, and schedule. The app keeps everything organized and reminds you when it's time to take 
              your medication.
            </p>
          </div>
        </div>

        <div className="feature-item reverse">
          <div className="feature-image">
            <img src={featureImage2} alt="Person checking medication reminder on phone" />
          </div>
          <div className="feature-text">
            <h3 className="feature-title instrument-sans-bold">Set Alerts and Track Your Health</h3>
            <p className="feature-description inter-light-text">
              The app automatically sets reminders to help you take your medication on time. You'll also get 
              alerts about potential interactions with other medications. Plus, you can track any side effects 
              or health changes and share this information with your doctor.
            </p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2 className="cta-title instrument-sans-bold">
          Ready to Test out  <span className="highlight">  MedTrack</span>?
        </h2>
        <p className="cta-description inter-light-text">
          Ready to take control of your medication? Start now and stay on track<br />
          with personalized reminders and alerts.
        </p>
        <a href="#" className="cta-button">
          Go To Dashboard
        </a>
        
      </div>
    </div>
  );
};

export default FeaturesHighlights;