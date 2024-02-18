const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData.js');

//
router.get('/formdata', async (req, res) => {
    try {
      const formData = await FormData.find();
      res.json(formData);
    } catch (err) {
      console.error('Error fetching form data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //
  router.get('/formdata', async (req, res) => {
    try {
      const formData = await FormData.find().sort({ deviceName: 1 }); // Sort items by deviceName
      res.json(formData);
    } catch (err) {
      console.error('Error fetching and sorting form data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST new form data
  router.post('/formdata', async (req, res) => {
    try {
      const formData = new FormData(req.body);
      await formData.save();
      res.status(201).json(formData);
    } catch (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;