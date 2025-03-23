import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState(null);  // State to store the response data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to handle any errors

  useEffect(() => {
    // Make the GET request to Flask API
    axios.get('http://localhost:5173/data')
      .then(response => {
        setData(response.data);  // Store the response data
        setLoading(false);  // Set loading to false after data is received
      })
      .catch(err => {
        setError('Error fetching data');  // Handle error
        setLoading(false);
      });
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  // Render the data when it's available
  return (
    
<div className="position-fixed top-0 start-0 mt-3 me-3">
  <h1>MedTrack</h1>
</div>
      
  );
}

export default App;
