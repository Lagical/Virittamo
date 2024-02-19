// Importing required modules
const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData.js'); // Importing FormData model

// Route to get all form data
router.get('/formdata', async (req, res) => {
  try {
    // Fetch all form data from the database
    const formData = await FormData.find();
    // Send the fetched form data as a JSON response
    res.json(formData);
  } catch (err) {
    // If an error occurs, log the error and send an internal server error response
    console.error('Error fetching form data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to post new form data
router.post('/formdata', async (req, res) => {
  try {
    // Create a new FormData object based on the request body
    const formData = new FormData(req.body);
    // Save the new form data to the database
    await formData.save();
    // Send a success response with the saved form data
    res.status(201).json(formData);
  } catch (err) {
    // If an error occurs, log the error and send an internal server error response
    console.error('Error saving form data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get specific device details by ID
router.get('/formdata/:deviceId', async (req, res) => {
  try {
    // Extract deviceId from URL parameters
    const deviceId = req.params.deviceId;
    // Fetch device details from the database based on deviceId
    const deviceDetails = await FormData.findById(deviceId);
    if (!deviceDetails) {
      // If device not found, send a 404 error response
      return res.status(404).json({ error: 'Device not found' });
    }
    // Send device details as JSON response
    res.json(deviceDetails);
  } catch (err) {
    // If an error occurs, log the error and send an internal server error response
    console.error('Error fetching device details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;