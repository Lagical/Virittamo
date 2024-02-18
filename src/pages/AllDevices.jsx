import React, { useState, useEffect } from 'react';

function AllDevices() {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/formdata')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>All devices</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>Device name: {item.deviceName} - Device number: {item.deviceNumber}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllDevices;