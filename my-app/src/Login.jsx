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
    </div>
  );
}

export default Login;

