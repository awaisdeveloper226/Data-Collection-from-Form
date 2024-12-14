const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (with database name 'Information')
mongoose.connect('mongodb+srv://muhammadawaisanas555:Yha!0987@cluster0.aujzy.mongodb.net/Information', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Body parser middleware to handle POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose schema and model for storing form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
});

// Specify the collection name explicitly as 'Details' 
// Mongoose will use this name for the collection in MongoDB
const FormData = mongoose.model('FormData', formDataSchema, 'Details');

// Handle form submission at the specified route
app.post('/submit-form', (req, res) => {
  const { name, email, phone, address } = req.body;

  const newFormData = new FormData({ name, email, phone, address });
  newFormData.save()
    .then(() => res.send('Data saved successfully'))
    .catch(err => res.status(500).send('Error saving data: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
