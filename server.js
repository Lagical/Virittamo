const express = require('express');
const mongoose = require('mongoose');
const FormDataRoutes = require('./server/routes/FormDataRoutes.js');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://groupiron:N8GuIiLAT8fd7OXj@cluster0.zjyrlee.mongodb.net/?retryWrites=true&w=majority', {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(FormDataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});