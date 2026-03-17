/**
 * MongoDB CRUD Verification Script
 * Run: node check-mongodb.js
 */

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: { type: String, unique: true },
  photo: String,
  class: String,
  sportsInvolvement: String,
  rank: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/student_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB\n');

    // COUNT: Show total students
    const totalCount = await Student.countDocuments();
    console.log(`📊 Total Students: ${totalCount}\n`);

    // READ: Show all students
    console.log('📋 All Students in Database:');
    const students = await Student.find().select('-photo');
    if (students.length === 0) {
      console.log('  (No students found)');
    } else {
      students.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} (ID: ${student.studentId}) - Rank: ${student.rank}`);
      });
    }

    console.log('\n✓ Database check complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
