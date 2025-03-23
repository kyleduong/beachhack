/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    // Handler for the username input
    const handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };
  
    // Handler for the password input
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

  useEffect(() => {
    // Any side-effects can go here
  }, []);

    return (
        <div>
            <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            placeholder='username'
            />
            <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder='password'
            />
        </div>
    );

}

*/
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handler for the username input
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Handler for the password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Register function triggered on button click
  const handleRegister = async () => {
    try {
<<<<<<< HEAD
        // Replace the URL with your actual login endpoint
        const response = await axios.post('http://localhost:5000/login', { userName, password });
        console.log("Login Handled");
        if (response.status === 200) {
        // Optionally, you can do something with the response (e.g., store a token)
        // Navigate to another route, such as a dashboard or home page
        navigate('/users');
        }
    } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.error(err);
    }
};
=======
      const response = await axios.post('http://localhost:5000/create', {
        userName,
        password
      });
>>>>>>> 5b0b45d85b1c55da583b511c24ef0b505456210a

      if (response.status === 201) {
        setMessage("✅ Registration successful!");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        placeholder="Username"
      /><br />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      /><br />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;


