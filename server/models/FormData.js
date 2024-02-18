const mongoose = require('mongoose');

// Defining the schema for form data
const formDataSchema = new mongoose.Schema({
  dateOfIssue: {
    type: Date,
    required: true
  },
  deviceName: {
    type: String,    
  },
  manufacturer: {
    type: String,
  },
  deviceNumber: {
    type: String,    
  },
  recipientName: {
    type: String,
  },
  department: {
    type: String,  
  },
  returningDate: {
    type: Date,
    required: true
  }
});

// Creating a model named 'FormData' using the formDataSchema
const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;