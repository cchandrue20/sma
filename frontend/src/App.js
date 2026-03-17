import React, { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch (err) {
      setError('Failed to fetch students: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Management System</h1>
        {/* <p>Manage student records with photos and details</p> */}
      </header>

      <main className="app-main">
        <div className="container">
          {/* Error Message */}
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {/* Student Form Section */}
          <section className="form-section">
            <h2>Add New Student</h2>
            <StudentForm onStudentAdded={fetchStudents} />
          </section>

          {/* Students List Section */}
          <section className="list-section">
            <h2>Student Records ({students.length})</h2>
            {loading ? (
              <div className="loading">Loading students...</div>
            ) : students.length === 0 ? (
              <div className="no-data">No students found. Add a new student to get started!</div>
            ) : (
              <StudentList students={students} onStudentDeleted={fetchStudents} />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Student Management System</p>
      </footer>
    </div>
  );
}

export default App;
