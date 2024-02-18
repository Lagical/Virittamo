import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemText, Typography, Card, CardContent, Popover, TextField } from '@mui/material';

function AllDevices() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/formdata')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleListItemClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.deviceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const open = Boolean(anchorEl);

    return (
        <div>     
            <br/><br/>
            <Typography variant="h5" gutterBottom>All devices</Typography>
            <br/>
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <List>
                {filteredData.map(item => (
                    <ListItemButton key={item._id} onClick={(event) => handleListItemClick(event, item)}>
                        <ListItemText primary={`Device name: ${item.deviceName}`} secondary={`Device number: ${item.deviceNumber}`} />
                    </ListItemButton>
                ))}
            </List>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {selectedItem && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Selected Device</Typography>
                            <Typography>Device name: {selectedItem.deviceName}</Typography>
                            <Typography>Device number: {selectedItem.deviceNumber}</Typography>
                            <Typography>Date of issue: {selectedItem.dateOfIssue}</Typography>
                            <Typography>Manufacturer: {selectedItem.manufacturer}</Typography>
                            <Typography>Recipient name: {selectedItem.recipientName}</Typography>
                            <Typography>Department: {selectedItem.department}</Typography>
                            <Typography>Returning date: {selectedItem.returningDate}</Typography>
                            <button onClick={handleClosePopover}>Close</button>
                        </CardContent>
                    </Card>
                )}
            </Popover>
        </div>
    );
}

export default AllDevices;