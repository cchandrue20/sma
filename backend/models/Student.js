const mongoose = require('mongoose');

// Define Student Schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    studentId: {
      type: String,
      required: [true, 'Please provide student ID'],
      unique: true,
      trim: true
    },
    photo: {
      type: String,
      default: null
    },
    class: {
      type: String,
      required: [true, 'Please provide class'],
      enum: ['CSE', 'IT', 'ECE', 'ME', 'CE', 'EEE', 'CIVIL']
    },
    sportsInvolvement: {
      type: String,
      default: 'None',
      enum: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Badminton', 'None']
    },
    rank: {
      type: Number,
      required: [true, 'Please provide rank'],
      min: 1,
      max: 100
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Create and export Student model
module.exports = mongoose.model('Student', studentSchema);
