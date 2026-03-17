import React, { useState } from 'react';
import './StudentList.css';

function StudentList({ students, onStudentDeleted, onEditStudent }) {
  const [expandedId, setExpandedId] = useState(null);

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          alert('✓ Student deleted successfully');
          if (onStudentDeleted) {
            onStudentDeleted();
          }
        } else {
          alert('Error deleting student');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting student: ' + error.message);
      }
    }
  };

  // Toggle card expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get rank badge color
  const getRankColor = (rank) => {
    if (rank <= 10) return '#FFD700'; // Gold
    if (rank <= 30) return '#C0C0C0'; // Silver
    if (rank <= 60) return '#CD7F32'; // Bronze
    return '#999'; // Gray
  };

  return (
    <div className="student-list">
      {students.length === 0 ? (
        <p className="empty-message">No students found</p>
      ) : (
        <div className="cards-grid">
          {students.map(student => (
            <div key={student._id} className="student-card">
              {/* Student Photo */}
              <div className="student-photo-container">
                {student.photo ? (
                  <img 
                    src={`http://localhost:5000${student.photo}`}
                    alt={student.name}
                    className="student-photo"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200?text=No+Photo';
                    }}
                  />
                ) : (
                  <div className="no-photo">
                    <span>📷</span>
                    <p>No Photo</p>
                  </div>
                )}
              </div>

              {/* Rank Badge */}
              <div 
                className="rank-badge" 
                style={{ backgroundColor: getRankColor(student.rank) }}
              >
                Rank: {student.rank}
              </div>

              {/* Card Header */}
              <div className="card-header">
                <h3>{student.name}</h3>
                <p className="student-id">ID: {student.studentId}</p>
              </div>

              {/* Card Content - Always Visible */}
              <div className="card-content">
                <div className="info-row">
                  <span className="label">Class:</span>
                  <span className="value">{student.class}</span>
                </div>
                <div className="info-row">
                  <span className="label">Sports:</span>
                  <span className="value">{student.sportsInvolvement}</span>
                </div>
              </div>

              {/* Expandable Details */}
              <button
                className="expand-btn"
                onClick={() => toggleExpand(student._id)}
              >
                {expandedId === student._id ? '⌃ Collapse' : '⌄ More Details'}
              </button>

              {expandedId === student._id && (
                <div className="expanded-content">
                  <div className="detail-row">
                    <span className="label">Added:</span>
                    <span className="value">{formatDate(student.createdAt)}</span>
                  </div>
                  {student.updatedAt && student.updatedAt !== student.createdAt && (
                    <div className="detail-row">
                      <span className="label">Updated:</span>
                      <span className="value">{formatDate(student.updatedAt)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="card-actions">
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => onEditStudent && onEditStudent(student)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(student._id)}
                  title="Delete student"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;
