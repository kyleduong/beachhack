import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function MedTrackDashboard() {
  // State for user data and medications
  const [userData, setUserData] = useState({ name: "User", id: null });
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
    
    // Fetch user data
    const fetchUserData = async () => {
      try {
        // In a production environment, get the logged-in user
        // const response = await axios.get("http://localhost:5000/current_user");
        // setUserData(response.data);
        
        // For now, using mock data
        setUserData({ name: "Lebron", id: 1 });
        
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
      // In production, fetch user's medications from the database
      const response = await axios.get(`http://localhost:5000/users/${userData.id}`);
      
      if (response.data && response.data.medications) {
        setMedications(response.data.medications);
      } else {
        // Fallback to mock data if needed
        const response = await axios.get("http://localhost:5000/medicine");
        
        // If that fails too, use static data
        if (!response.data) {
          const mockMeds = [
            {
              medication_name: "Ibuprofen",
              dosage: "2 pills",
              doctor_name: "Dr. Smith",
              days_needed: 7,
              status: "upcoming"
            },
            {
              medication_name: "Ache Cream",
              dosage: "6 mL",
              doctor_name: "Dr. Johnson",
              days_needed: 14,
              status: "taken"
            },
            {
              medication_name: "Pepto Bismol",
              dosage: "30 mL",
              doctor_name: "Dr. Williams",
              days_needed: 3,
              status: "missed"
            }
          ];
          setMedications(mockMeds);
        }
      }
      
      // Calculate completion percentage
      const taken = medications.filter(med => med.status === "taken").length;
      const total = medications.length;
      setCompletionPercentage(total > 0 ? Math.round((taken / total) * 100) : 0);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };
  
  // Handle marking medication as taken
  const handleMarkAsTaken = async (medicationId, index) => {
    try {
      // In production, update the medication status in the database
      // await axios.put(`http://localhost:5000/medications/${medicationId}`, {
      //   status: "taken"
      // });
      
      // For now, update the local state
      const updatedMedications = [...medications];
      updatedMedications[index] = {
        ...updatedMedications[index],
        status: updatedMedications[index].status === "taken" ? "upcoming" : "taken"
      };
      
      setMedications(updatedMedications);
      
      // Recalculate completion percentage
      const taken = updatedMedications.filter(med => med.status === "taken").length;
      const total = updatedMedications.length;
      setCompletionPercentage(total > 0 ? Math.round((taken / total) * 100) : 0);
    } catch (error) {
      console.error("Error updating medication status:", error);
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

        {medications.length > 0 ? (
          medications.map((med, index) => (
            <div key={index} className={`med-card ${med.status || 'upcoming'}`}>
              <div className="med-card-header">
                <h3>{med.medication_name}</h3>
                <button 
                  className={`checkmark-button ${med.status === 'taken' ? 'checked' : ''}`}
                  onClick={() => handleMarkAsTaken(med.id, index)}
                >
                  {med.status === 'taken' ? '✓' : '○'}
                </button>
              </div>
              <div className="med-card-content">
                <div className="med-info">
                  <p><strong>Dosage:</strong> {med.dosage}</p>
                  <p><strong>Doctor:</strong> {med.doctor_name}</p>
                  <p><strong>Days to Take:</strong> {med.days_needed}</p>
                </div>
                <div className="med-status">
                  <p>Status {getStatusEmoji(med.status || 'upcoming')} 
                  ({med.status ? med.status.charAt(0).toUpperCase() + med.status.slice(1) : 'Upcoming'})</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-meds-message">
            <p>No medications scheduled for today.</p>
            <button className="add-med-button" onClick={() => setShowModal(true)}>
              Add a Medication
            </button>
          </div>
        )}

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
          <p>You have <strong>{medications.filter(med => med.status !== "taken").length}</strong> remaining medications needed to be taken</p>
          <h4>Upcoming Medications</h4>
          <ul>
            {medications.filter(med => med.status === "upcoming").slice(0, 3).map((med, index) => (
              <li key={index}>{med.medication_name} - {med.dosage}</li>
            ))}
            {medications.filter(med => med.status === "upcoming").length === 0 && (
              <li>No upcoming medications</li>
            )}
          </ul>
        </div>

        <div className="medical-history">
          <h3>Medical History</h3>
          <ul>
            {medications.filter(med => med.status === "taken").slice(0, 3).map((med, index) => (
              <li key={index}>{med.medication_name} - {med.dosage}</li>
            ))}
            {medications.filter(med => med.status === "taken").length === 0 && (
              <li>No medication history yet</li>
            )}
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