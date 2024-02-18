const mongoose = require('mongoose');

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

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;