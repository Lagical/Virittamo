import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar } from '@mui/material';
import DateOfIssuePicker from './DateOfIssuePicker.jsx';
import ReturnDatePicker from './ReturnDatePicker.jsx';

const Form = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    dateOfIssue: null,
    deviceName: '',
    manufacturer: '',
    deviceNumber: '',
    recipientName: '',
    department: '',
    returningDate: null
  });

   // State to manage Snackbar visibility
   const [snackbarOpen, setSnackbarOpen] = useState(false);

   // Event handler for date of issue change
   const handleDateOfIssueChange = (date) => {
     setFormData({
       ...formData,
       dateOfIssue: date
     });
   };
 
   // Event handler for returning date change
   const handleReturningDateChange = (date) => {
     setFormData({
       ...formData,
       returningDate: date
     });
   };
 
   // Event handler for input change
   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setFormData({
       ...formData,
       [name]: value
     });
   };
 
   // Event handler for form submission
   const handleSubmit = async (event) => {
     event.preventDefault(); // Prevent default form submission behavior
     
     // Check if any field is empty
     const isAnyFieldEmpty = Object.values(formData).some(value => value === '');
     
     if (isAnyFieldEmpty) {
       setSnackbarOpen(true); // Open the Snackbar
       return; // Stop submission if any field is empty
     }
     
     try {
       // Sending form data to server for saving
       const response = await fetch('http://localhost:3000/formdata', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json' // Setting content type to JSON
         },
         body: JSON.stringify(formData) // Converting form data to JSON string
       });
       if (response.ok) {
         console.log('Form data saved successfully'); // Log success message
         window.location.href = '/'; // Redirect to home page after successful submission
       } else {
         console.error('Failed to save form data'); // Log error message if submission fails
       }
     } catch (error) {
       console.error('Error saving form data:', error); // Log error if an exception occurs
     }
   };
 
   // Event handler for Snackbar close
   const handleSnackbarClose = () => {
     setSnackbarOpen(false);
   };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DateOfIssuePicker
            label="Date of issue"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleDateOfIssueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Device name"
            variant="outlined"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Manufacturer"
            variant="outlined"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Device number"
            variant="outlined"
            name="deviceNumber"
            value={formData.deviceNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Recipient name"
            variant="outlined"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ReturnDatePicker
            label="Date of return"
            name="returningDate"
            value={formData.returningDate}
            onChange={handleReturningDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message="Please fill in all fields"
      />
    </form>
  );
};

export default Form;