import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make the GET request to Flask API
    axios.get('http://localhost:5000/medicine')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

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
      {data && (
        <div>
          <p>Welcome to MedTrack - {data.Date}</p>
        </div>
      )}
    </div>
  );
}

export default App;