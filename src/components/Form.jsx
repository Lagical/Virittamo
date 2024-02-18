import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import DateOfIssuePicker from './DateOfIssuePicker.jsx';
import ReturnDatePicker from './ReturnDatePicker.jsx';

const Form = () => {
    const [formData, setFormData] = useState({
        dateOfIssue: null,
        deviceName: '',
        manufacturer: '',
        deviceNumber: '',
        recipientName: '',
        department: '',
        returningDate: null
      });
  
      const handleDateOfIssueChange = (date) => {
        setFormData({
          ...formData,
          dateOfIssue: date
        });
      };
    
      const handleReturningDateChange = (date) => {
        setFormData({
          ...formData,
          returningDate: date
        });
      };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/formdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            console.log('Form data saved successfully');
          } else {
            console.error('Failed to save form data');
          }
        } catch (error) {
          console.error('Error saving form data:', error);
        }
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
      </form>
    );
  };
  
  export default Form;