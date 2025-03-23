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

// Login function triggered on button click
const handleLogin = async () => {
    try {
        // Replace the URL with your actual login endpoint
        const response = await axios.post('http://localhost:5000/login', { userName, password });
        
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

  useEffect(() => {
    // Any side-effects can go here
  }, []);

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        placeholder="username"
      />
      <input
        type="text"
        value={password}
        onChange={handlePasswordChange}
        placeholder="password"
      />
      <button onClick={handleLogin}> login</button>
    </div>
  );
}

export default Login;

