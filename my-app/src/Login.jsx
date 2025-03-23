import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [patientName, setPatientName] = useState("");
  const [message, setMessage] = useState("");

  // Register function triggered on button click
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create', {
        userName,
        password,
        patientName
      });

      if (response.status === 201) {
        setMessage("✅ Registration successful!");
        // Clear form after successful registration
        setUserName("");
        setPassword("");
        setPatientName("");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
      console.error(err);
    }
  };

  return (
    <div style={{ margin: '20px', marginTop: '100px' }}>
      <h2>Register New Patient Account</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          className="form-control mb-2"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Patient Name"
        />
        <button 
          className="btn btn-primary" 
          onClick={handleRegister}
        >
          Register
        </button>
        {message && <p className={message.includes("✅") ? "text-success" : "text-danger"}>{message}</p>}
      </div>
    </div>
  );
}

export default Register;

