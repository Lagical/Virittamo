import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemText, Typography, Card, CardContent, Popover, TextField } from '@mui/material';

function AllDevices() {
 // State variables to manage data, popover anchor, selected item, and search query
 const [data, setData] = useState([]); // State variable for storing fetched data
 const [anchorEl, setAnchorEl] = useState(null); // State variable for popover anchor
 const [selectedItem, setSelectedItem] = useState(null); // State variable for selected item
 const [searchQuery, setSearchQuery] = useState(''); // State variable for search query

 // useEffect hook to fetch data when component mounts
 useEffect(() => {
     // Fetching data from server
     fetch('http://localhost:3000/formdata')
         .then(response => response.json()) // Parsing response as JSON
         .then(data => setData(data)) // Setting fetched data to state
         .catch(error => console.error('Error fetching data:', error)); // Logging error if fetch fails
 }, []); // Empty dependency array ensures useEffect runs only once, when component mounts

 // Event handler for list item click
 const handleListItemClick = (event, item) => {
     setAnchorEl(event.currentTarget); // Setting anchor for popover
     setSelectedItem(item); // Setting selected item
 };

 // Event handler for closing popover
 const handleClosePopover = () => {
     setAnchorEl(null); // Clearing anchor for popover
     setSelectedItem(null); // Clearing selected item
 };

 // Event handler for search input change
 const handleSearchChange = (event) => {
     setSearchQuery(event.target.value); // Setting search query
 };

 // Filtering data based on search query
 const filteredData = data.filter(item =>
     item.deviceName.toLowerCase().includes(searchQuery.toLowerCase())
 );

 // Checking if popover is open
 const open = Boolean(anchorEl);

 // Rendering the component
 return (
     <div>     
         <br/><br/>
         <Typography variant="h5" gutterBottom>All devices</Typography>
         <br/>
         {/* Search input field */}
         <TextField
             label="Search by name"
             variant="outlined"
             value={searchQuery}
             onChange={handleSearchChange}
         />
         {/* List of devices */}
         <List>
             {filteredData.map(item => (
                 <ListItemButton key={item._id} onClick={(event) => handleListItemClick(event, item)}>
                     {/* Displaying device name and number */}
                     <ListItemText primary={`Device name: ${item.deviceName}`} secondary={`Device number: ${item.deviceNumber}`} />
                 </ListItemButton>
             ))}
         </List>
         {/* Popover displaying details of selected device */}
         <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
         >
             {selectedItem && (
                 <Card>
                     <CardContent>
                         {/* Displaying details of selected device */}
                         <Typography>Device name: {selectedItem.deviceName}</Typography>
                         <Typography>Device number: {selectedItem.deviceNumber}</Typography>
                         <Typography>Date of issue: {selectedItem.dateOfIssue}</Typography>
                         <Typography>Manufacturer: {selectedItem.manufacturer}</Typography>
                         <Typography>Recipient name: {selectedItem.recipientName}</Typography>
                         <Typography>Department: {selectedItem.department}</Typography>
                         <Typography>Returning date: {selectedItem.returningDate}</Typography>
                         {/* Button to close the popover */}
                         <button onClick={handleClosePopover}>Close</button>
                     </CardContent>
                 </Card>
             )}
         </Popover>
     </div>
 );
}

export default AllDevices;