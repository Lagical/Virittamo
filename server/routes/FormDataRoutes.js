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

module.exports = router;