const express = require('express');
const mongoose = require('mongoose');
const FormDataRoutes = require('./server/routes/FormDataRoutes.js');
const cors = require('cors');


const app = express(); // Creating an instance of Express application

// Retrieving MongoDB URI from environment variables
const mongodbUri = process.env.MONGODB_URI;

// Enable CORS for all origins
app.use(cors());

// Setting up the port number
const PORT = process.env.PORT || 3000;

// Parsing JSON request bodies
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(mongodbUri, {
})
.then(() => console.log('Connected to MongoDB')) // Log success message if connected to MongoDB
.catch(err => console.error('Error connecting to MongoDB:', err)); // Log error if connection fails

// Using form data routes
app.use(FormDataRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message indicating server is running and listening on a specific port
});