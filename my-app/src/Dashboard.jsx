import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function MedTrackDashboard() {
  // State for user data and medications
  const [userData, setUserData] = useState({ name: "User" });
  const [medications, setMedications] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // States for medication modal
  const [showModal, setShowModal] = useState(false);
  
  // States for adding a new medication
  const [newPatientName, setNewPatientName] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dosage, setDosage] = useState("");
  const [daysNeeded, setDaysNeeded] = useState("");
  const [addMsg, setAddMsg] = useState("");
  
  // States for searching
  const [medicationSearch, setMedicationSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Fetch user data and medications on component mount
  useEffect(() => {
    // Get current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    
    // Mock user data - in production you would fetch this from your API
    const fetchUserData = async () => {
      try {
        // Replace with actual API call to get current user
        // const response = await axios.get("http://localhost:5000/current_user");
        // setUserData(response.data);
        
        // Using mock data for now
        setUserData({ name: "Lebron" });
        
        // Then fetch medications for this user
        fetchMedications();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Fetch medications for current user
  const fetchMedications = async () => {
    try {
      // In production replace with actual call to get user's medications
      // const response = await axios.get(`http://localhost:5000/user_medications/${userData.id}`);
      // setMedications(response.data);
      
      // Mock data - in production, fetch from your API
      const mockMeds = [
        {
          medication_name: "Ibuprofen",
          dosage: "2 pills",
          time: "2:30 P.M",
          status: "upcoming"
        },
        {
          medication_name: "Ache Cream",
          dosage: "6 mL",
          time: "12:05 P.M",
          status: "taken"
        },
        {
          medication_name: "Pepto Bismol",
          dosage: "30 mL",
          time: "8:00 A.M",
          status: "missed"
        }
      ];
      
      setMedications(mockMeds);
      
      // Calculate completion percentage
      const taken = mockMeds.filter(med => med.status === "taken").length;
      setCompletionPercentage(Math.round((taken / mockMeds.length) * 100));
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };
  
  // Handle searching for medications
  const handleSearch = async () => {
    if (!medicationSearch.trim()) {
      setSearchError("Please enter a medication name");
      return;
    }

    setLoading(true);
    setSearchError("");
    setSearchResults([]);
    setSearchPerformed(true);
    
    try {
      console.log(`Searching for: ${medicationSearch}`);
      const response = await axios.get(`http://localhost:5000/search?name=${encodeURIComponent(medicationSearch)}`);
      console.log('Search response:', response.data);
      
      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'An error occurred while searching. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a new medication
  const handleAddMedication = async () => {
    // Validate input fields
    if (!newPatientName || !medicationName || !doctorName || !dosage || !daysNeeded) {
      setAddMsg('Please fill in all fields');
      return;
    }

    setAddMsg('');
    try {
      const response = await axios.post('http://localhost:5000/medications', {
        patient_name: newPatientName,
        medication_name: medicationName,
        doctor_name: doctorName,
        dosage: dosage,
        days_needed: parseInt(daysNeeded, 10) || 0
      });
      setAddMsg(response.data.message || 'Medication added successfully');
      
      // Clear the input fields after a successful add
      setNewPatientName('');
      setMedicationName('');
      setDoctorName('');
      setDosage('');
      setDaysNeeded('');
      
      // Close modal and refresh medications
      setTimeout(() => {
        setShowModal(false);
        fetchMedications();
      }, 1500);
    } catch (err) {
      console.error('Error adding medication:', err);
      setAddMsg(err.response?.data?.error || 'An error occurred while adding medication.');
    }
  };
  
  // Helper function to get status emoji
  const getStatusEmoji = (status) => {
    switch(status) {
      case "taken": return "🟩";
      case "upcoming": return "🟨";
      case "missed": return "🟥";
      default: return "⬜";
    }
  };

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
        <div className="dashboard-buttons">
          <button className="add-med-button" onClick={() => setShowModal(true)}>
            Add Medication
          </button>
          <button className="search-button" onClick={() => setShowSearchModal(true)}>
            Search
          </button>
          <div className="join-button">Join Us</div>
        </div>
      </div>

      {/* Greeting */}
      <div className="user-greeting">
        <div className="greeting-text">Good Morning, {userData.name}!</div>
        <div className="date-text">{currentDate}</div>
      </div>

      {/* Medication Section */}
      <div className="medication-section">
        <h2>Today's Medications:</h2>

        {medications.map((med, index) => (
          <div key={index} className={`med-card ${med.status}`}>
            <p>{med.medication_name}</p>
            <p>{med.dosage}</p>
            <p>{med.time}</p>
            <p>Status {getStatusEmoji(med.status)} ({med.status.charAt(0).toUpperCase() + med.status.slice(1)})</p>
          </div>
        ))}

        <div className="percentage-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
          <span className="progress-text">Percentage Completed: {completionPercentage}%</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="symptom-log">
          <h3>Any New Symptoms Occur?</h3>
          <p>Log them here for your doctor to see.</p>
          <textarea className="symptom-textarea" placeholder="Describe your symptoms..."></textarea>
          <button className="log-symptom-btn">Submit</button>
        </div>

        <div className="reminder-tab">
          <h3>REMINDER:</h3>
          <p>You have <strong>{medications.filter(med => med.status === "upcoming").length}</strong> remaining medications needed to be taken</p>
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

      {/* Add Medication Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Medication</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="modal-input"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                placeholder="Patient name"
              />
              <input
                type="text"
                className="modal-input"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                placeholder="Medication name"
              />
              <input
                type="text"
                className="modal-input"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Doctor name"
              />
              <input
                type="text"
                className="modal-input"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="Dosage"
              />
              <input
                type="number"
                className="modal-input"
                value={daysNeeded}
                onChange={(e) => setDaysNeeded(e.target.value)}
                placeholder="Days needed"
              />
              <button className="add-med-modal-button" onClick={handleAddMedication}>Add Medication</button>
              {addMsg && <p className="modal-message">{addMsg}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Search Medications</h2>
              <button className="close-button" onClick={() => setShowSearchModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="search-container">
                <input
                  type="text"
                  className="modal-input"
                  value={medicationSearch}
                  onChange={(e) => setMedicationSearch(e.target.value)}
                  placeholder="Enter medication name"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-modal-button" onClick={handleSearch}>Search</button>
              </div>
              
              {loading && <p>Loading...</p>}
              {searchError && <p className="error-text">{searchError}</p>}
              
              {searchPerformed && !loading && !searchError && (
                <div className="search-results">
                  <h3>Search Results for "{medicationSearch}"</h3>
                  {searchResults.length > 0 ? (
                    <ul className="results-list">
                      {searchResults.map((med, index) => (
                        <li key={index} className="result-item">
                          <h4>{med.medication_name}</h4>
                          <p><strong>Patient:</strong> {med.patient_name}</p>
                          <p><strong>Doctor:</strong> {med.doctor_name}</p>
                          <p><strong>Dosage:</strong> {med.dosage}</p>
                          <p><strong>Days needed:</strong> {med.days_needed}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No medications found matching "{medicationSearch}"</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}