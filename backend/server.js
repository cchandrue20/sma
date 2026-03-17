// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_management';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✓ Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });


app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Student Management System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: true, 
    message: 'Server error',
    details: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nServer is running on http://localhost:${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api\n`);
});
