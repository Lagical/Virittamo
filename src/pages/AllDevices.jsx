import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, TextField, Box } from '@mui/material';
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
        <Box p={2}>
            {/* Title */}
            <Typography variant="h5" gutterBottom>All devices</Typography>
            {/* Search input */}
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />
            {/* List of devices */}
            <List>
                {/* Mapping through filtered data and displaying each device */}
                {filteredData.map(item => (
                    <ListItem key={item._id} button component={Link} to={`/deviceinfo?deviceId=${item._id}`}>
                        {/* Link to device info page */}
                        <ListItemText
                            primary={`Device name: ${item.deviceName}`}
                            secondary={`Device number: ${item.deviceNumber}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default AllDevices;