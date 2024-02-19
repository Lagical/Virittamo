import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemText, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function AllDevices() {
    // State variables for storing data and search query
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Effect hook to fetch data from server when component mounts
    useEffect(() => {
        fetch('http://localhost:3000/formdata')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    // Handler function to update search query state
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtering data based on search query
    const filteredData = data.filter(item =>
        item.deviceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <br /><br />
            <Typography variant="h5" gutterBottom>All devices</Typography>
            <br />
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <List>
                {/* Mapping through filtered data and displaying each device */}
                {filteredData.map(item => (
                    <ListItemButton key={item._id}>
                        {/* Link to device info page */}
                        <Link to={`/deviceinfo?deviceId=${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {/* Displaying device name and number */}
                            <ListItemText primary={`Device name: ${item.deviceName}`} secondary={`Device number: ${item.deviceNumber}`} />
                        </Link>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
}

export default AllDevices;