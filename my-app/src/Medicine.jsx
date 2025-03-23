// App.js
import React, { useState } from 'react';
import axios from 'axios';

function Medicine() {
  // States for searching
  const [patientName, setPatientName] = useState('');
  const [medications, setMedications] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);

  // States for adding a new medication
  const [newPatientName, setNewPatientName] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [prescriptionProvider, setPrescriptionProvider] = useState('');
  const [totalDosage, setTotalDosage] = useState('');
  const [addMsg, setAddMsg] = useState('');

  // Search for a patient's medications
  const handleSearch = async () => {
    setLoading(true);
    setSearchError('');
    setMedications([]);
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${encodeURIComponent(patientName)}`);
      setMedications(response.data.medications);
    } catch (err) {
      console.error(err);
      setSearchError(err.response?.data?.error || 'An error occurred while fetching data.');
    }
    setLoading(false);
  };

  // Add a new medication for a patient
  const handleAddMedication = async () => {
    setAddMsg('');
    try {
      const response = await axios.post('http://localhost:5000/medications', {
        patient_name: newPatientName,
        medication_name,
        prescription_provider: prescriptionProvider,
        total_dosage
      });
      setAddMsg(response.data.message);
      // Optionally, clear the input fields after a successful add:
      setNewPatientName('');
      setMedicationName('');
      setPrescriptionProvider('');
      setTotalDosage('');
    } catch (err) {
      console.error(err);
      setAddMsg(err.response?.data?.error || 'An error occurred while adding medication.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Patient Medication System</h1>
      <section style={{ marginBottom: '40px' }}>
        <h2>Search Patient Medications</h2>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient name"
        />
        <button onClick={handleSearch}>Find</button>
        {loading && <p>Loading...</p>}
        {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
        {medications.length > 0 && (
          <div>
            <h3>Medications for {patientName}</h3>
            <ul>
              {medications.map((med, index) => (
                <li key={index}>
                  <strong>{med.medication_name}</strong><br />
                  Provider: {med.prescription_provider}<br />
                  Total Dosage: {med.total_dosage}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2>Add New Medication</h2>
        <div>
          <input
            type="text"
            value={newPatientName}
            onChange={(e) => setNewPatientName(e.target.value)}
            placeholder="Patient name"
          />
          <input
            type="text"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            placeholder="Medication name"
          />
          <input
            type="text"
            value={prescriptionProvider}
            onChange={(e) => setPrescriptionProvider(e.target.value)}
            placeholder="Prescription provider"
          />
          <input
            type="text"
            value={totalDosage}
            onChange={(e) => setTotalDosage(e.target.value)}
            placeholder="Total dosage"
          />
          <button onClick={handleAddMedication}>Add Medication</button>
          {addMsg && <p>{addMsg}</p>}
        </div>
      </section>
    </div>
  );
}

export default Medicine;
