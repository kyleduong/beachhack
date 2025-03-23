import React, { useState } from 'react';
import axios from 'axios';

function Medicine() {
  // States for searching
  const [medicationSearch, setMedicationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // States for adding a new medication
  const [newPatientName, setNewPatientName] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [dosage, setDosage] = useState('');
  const [daysNeeded, setDaysNeeded] = useState('');
  const [addMsg, setAddMsg] = useState('');

  // Search for medications by name
  const handleSearch = async () => {
    if (!medicationSearch.trim()) {
      setSearchError('Please enter a medication name');
      return;
    }

    setLoading(true);
    setSearchError('');
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

  // Add a new medication for a patient
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
    } catch (err) {
      console.error('Error adding medication:', err);
      setAddMsg(err.response?.data?.error || 'An error occurred while adding medication.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Patient Medication System</h1>
      <section style={{ marginBottom: '40px' }}>
        <h2>Search Medications</h2>
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control me-2"
            value={medicationSearch}
            onChange={(e) => setMedicationSearch(e.target.value)}
            placeholder="Enter medication name"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
        
        {loading && <p>Loading...</p>}
        {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
        
        {searchPerformed && !loading && !searchError && (
          <div>
            <h3>Search Results for "{medicationSearch}"</h3>
            {searchResults.length > 0 ? (
              <ul className="list-group">
                {searchResults.map((med, index) => (
                  <li key={index} className="list-group-item">
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
      </section>

      <section>
        <h2>Add New Medication</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            value={newPatientName}
            onChange={(e) => setNewPatientName(e.target.value)}
            placeholder="Patient name"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            placeholder="Medication name"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Doctor name"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Dosage"
          />
          <input
            type="number"
            className="form-control mb-2"
            value={daysNeeded}
            onChange={(e) => setDaysNeeded(e.target.value)}
            placeholder="Days needed"
          />
          <button className="btn btn-success" onClick={handleAddMedication}>Add Medication</button>
          {addMsg && <p className="mt-2">{addMsg}</p>}
        </div>
      </section>
    </div>
  );
}

export default Medicine;