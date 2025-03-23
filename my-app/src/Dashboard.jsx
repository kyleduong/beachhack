import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Plus, Search, Clock, Check, Bell, Calendar, FileText } from 'lucide-react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import medication images
import image1 from "./Prescription 1.png";
import image2 from "./Prescription 2.png";
import image3 from "./Prescription 3.png";

const Dashboard = () => {
  // State for user data and medications
  const [userData, setUserData] = useState({ name: "User" });
  const [medications, setMedications] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // State for symptom logging
  const [symptomText, setSymptomText] = useState('');
  
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
    setCurrentDate(date.toLocaleDateString("en-US", { weekday: 'long', month: "long", day: "numeric", year: "numeric" }));
    
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
      
      // Mock data with imported images
      const mockMeds = [
        {
          id: 1,
          name: 'Hydrocodone',
          dosage: '1 Every 4 Hours',
          time: '6:30pm',
          status: 'LATE',
          done: false,
          tablet: '5th Tablet',
          image: image1
        },
        {
          id: 2,
          name: 'Tylenol',
          dosage: '500mg / 2 pills',
          time: '2:30pm',
          status: '',
          done: false,
          tablet: '',
          image: image2
        },
        {
          id: 3,
          name: 'Alprazolam',
          dosage: '3 Pills Daily',
          time: '2:30pm',
          status: '',
          done: false,
          tablet: '2nd Tablet',
          image: image3
        }
      ];
      
      setMedications(mockMeds);
      
      // Calculate completion percentage
      const taken = mockMeds.filter(med => med.done).length;
      setCompletionPercentage(Math.round((taken / mockMeds.length) * 100));
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };
  
  // Handle symptom submission
  const handleSymptomSubmit = (e) => {
    e.preventDefault();
    
    // In production, you'd send this to your API
    console.log("Symptom submitted:", symptomText);
    
    // Clear the input field
    setSymptomText('');
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
      // In production, replace with actual API call
      // const response = await axios.get(`http://localhost:5000/search?name=${encodeURIComponent(medicationSearch)}`);
      
      // Mock response for now
      const mockResponse = {
        data: {
          results: [
            {
              medication_name: "Hydrocodone",
              patient_name: "John Doe",
              doctor_name: "Dr. Smith",
              dosage: "10mg",
              days_needed: 7
            }
          ]
        }
      };
      
      const response = mockResponse;
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
      // In production, replace with actual API call
      // const response = await axios.post('http://localhost:5000/medications', {
      //   patient_name: newPatientName,
      //   medication_name: medicationName,
      //   doctor_name: doctorName,
      //   dosage: dosage,
      //   days_needed: parseInt(daysNeeded, 10) || 0
      // });
      
      // Mock response for now
      const response = { data: { message: 'Medication added successfully' } };
      
      setAddMsg(response.data.message || 'Medication added successfully');
      
      // Add the new medication to the list with a placeholder image
      const newMed = {
        id: medications.length + 1,
        name: medicationName,
        dosage: dosage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: '',
        done: false,
        tablet: '1st Tablet',
        image: image1 // Use image1 as a placeholder
      };
      
      setMedications(prevMeds => [...prevMeds, newMed]);
      
      // Clear the input fields after a successful add
      setNewPatientName('');
      setMedicationName('');
      setDoctorName('');
      setDosage('');
      setDaysNeeded('');
      
      // Close modal after success
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (err) {
      console.error('Error adding medication:', err);
      setAddMsg(err.response?.data?.error || 'An error occurred while adding medication.');
    }
  };
  
  // Toggle medication status
  const toggleMedicationStatus = (id) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === id 
          ? { ...med, done: !med.done } 
          : med
      )
    );
  };

  // Get remaining medications count
  const getRemainingMedications = () => {
    return medications.filter(med => !med.done).length;
  };

  // Custom styling for React Bootstrap components
  const modalStyle = {
    content: {
      borderRadius: '15px',
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      padding: '0',
      background: '#fff'
    }
  };

  const buttonStyle = {
    backgroundColor: '#E3D3FA',
    borderColor: '#E3D3FA',
    borderRadius: '20px',
    padding: '10px 20px',
    fontWeight: '500',
    color: '#000',
    fontFamily: '"Inter", sans-serif',
    width: '100%',
    marginTop: '20px'
  };

  const formControlStyle = {
    padding: '16px 20px',
    marginBottom: '20px',
    borderRadius: '10px',
    fontSize: '16px',
    fontFamily: '"Inter", sans-serif'
  };

  return (
    <div className="dashboard-container">
      
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1 className="instrument-sans-bold">Hello, <span className="username">{userData.name}!</span></h1>
          <p className="date inter-light-text">{currentDate}</p>
          
          <h2 className="medications-counter instrument-sans-bold">Today's Medications: {medications.length}</h2>
        </div>
        <div className="action-buttons">
          <button className="add-button" onClick={() => setShowModal(true)}>
            <Plus size={24} />
          </button>
          <button className="search-button" onClick={() => setShowSearchModal(true)}>
            <Search size={24} />
          </button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="medications-list">
          {medications.map((med) => (
            <div key={med.id} className="medication-card">
              <div className="medication-image">
                <img src={med.image} alt={med.name} />
              </div>
              <div className="medication-info">
                <h3 className="instrument-sans-bold">{med.name}</h3>
                <p className="inter-light-text">{med.dosage}</p>
                <p className="inter-light-text">{med.time}</p>
                {med.tablet && <p className="inter-light-text">{med.tablet}</p>}
                
                {med.status === 'LATE' && (
                  <div className="status-badge late">
                    <Clock size={16} className="clock-icon" /> LATE
                  </div>
                )}
              </div>
              <div className="medication-status" onClick={() => toggleMedicationStatus(med.id)}>
                <div className={`status-checkbox ${med.done ? 'checked' : ''}`}>
                  {med.done && <Check size={16} className="check-icon" />}
                </div>
                <p className="inter-light-text">Done</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="sidebar">
          <div className="symptoms-form">
            <h2 className="instrument-sans-bold">New Symptoms?</h2>
            <p className="inter-light-text">Log them here for your doctor to see.</p>
            
            <form onSubmit={handleSymptomSubmit}>
              <textarea 
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                placeholder="Describe Symptoms..."
                className="symptoms-input"
              />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
          
          <div className="reminder-section">
            <h2 className="instrument-sans-bold">
              <Bell size={20} className="section-icon" /> Reminder:
            </h2>
            <p className="inter-light-text">You have {getRemainingMedications()} remaining medications needed to be taken today.</p>
          </div>
          
          <div className="upcoming-medications">
            <h2 className="instrument-sans-bold">
              <Calendar size={20} className="section-icon" /> Upcoming Medications
            </h2>
            <ul>
              <li className="inter-light-text">1/31: Deez</li>
              <li className="inter-light-text">2/20: Begin Ozempic</li>
            </ul>
          </div>
          
          <div className="medical-history">
            <h2 className="instrument-sans-bold">
              <FileText size={20} className="section-icon" /> Medical History
            </h2>
            <ul>
              <li className="inter-light-text">1/31: Deez Nuts</li>
              <li className="inter-light-text">12/24: Mustard</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add Medication Modal using React Bootstrap */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        contentClassName="custom-modal-content"
        backdropClassName="custom-modal-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title className="instrument-sans-bold">Add New Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Patient name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                style={formControlStyle}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Medication name"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                style={formControlStyle}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Doctor name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                style={formControlStyle}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                style={formControlStyle}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Days needed"
                value={daysNeeded}
                onChange={(e) => setDaysNeeded(e.target.value)}
                style={formControlStyle}
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              onClick={handleAddMedication}
              style={buttonStyle}
            >
              Add Medication
            </Button>
            
            {addMsg && (
              <div className="text-center mt-3">
                <p>{addMsg}</p>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      {/* Search Modal using React Bootstrap */}
      <Modal 
        show={showSearchModal} 
        onHide={() => setShowSearchModal(false)}
        centered
        contentClassName="custom-modal-content"
        backdropClassName="custom-modal-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title className="instrument-sans-bold">Search Medications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex mb-3">
              <Form.Control
                type="text"
                placeholder="Enter medication name"
                value={medicationSearch}
                onChange={(e) => setMedicationSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{ ...formControlStyle, marginBottom: 0, marginRight: '10px' }}
              />
              <Button 
                variant="primary" 
                onClick={handleSearch}
                style={{ ...buttonStyle, marginTop: 0, width: 'auto' }}
              >
                Search
              </Button>
            </div>
          </Form>
          
          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          
          {searchError && (
            <p className="text-danger inter-light-text">{searchError}</p>
          )}
          
          {searchPerformed && !loading && !searchError && (
            <div className="mt-4">
              <h3 className="instrument-sans-bold">Search Results for "{medicationSearch}"</h3>
              
              {searchResults.length > 0 ? (
                <ul className="list-unstyled mt-3">
                  {searchResults.map((med, index) => (
                    <li key={index} className="border rounded p-3 mb-3">
                      <h4 className="instrument-sans-bold">{med.medication_name}</h4>
                      <p className="inter-light-text"><strong>Patient:</strong> {med.patient_name}</p>
                      <p className="inter-light-text"><strong>Doctor:</strong> {med.doctor_name}</p>
                      <p className="inter-light-text"><strong>Dosage:</strong> {med.dosage}</p>
                      <p className="inter-light-text"><strong>Days needed:</strong> {med.days_needed}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="inter-light-text">No medications found matching "{medicationSearch}"</p>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

// Placeholder Navbar component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🔗</span>
        <span className="logo-text"><span className="logo-med">Med</span>Track</span>
      </div>
      <div className="nav-links">
        <a href="#" className="nav-link active">Home</a>
        <a href="#" className="nav-link">About Us</a>
        <a href="#" className="nav-link">Our Goal</a>
      </div>
      <div className="auth-links">
        <a href="#" className="sign-up">Sign Up</a>
        <span className="divider">/</span>
        <a href="#" className="join-us">Join Us</a>
      </div>
    </nav>
  );
};

export default Dashboard;