import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({ onStudentAdded, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: 'CSE',
    sportsInvolvement: 'None',
    rank: ''
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        studentId: editingStudent.studentId || '',
        class: editingStudent.class || 'CSE',
        sportsInvolvement: editingStudent.sportsInvolvement || 'None',
        rank: editingStudent.rank ? String(editingStudent.rank) : ''
      });
      setPhoto(null);
      setPhotoPreview(editingStudent.photo || null);
      setMessage('');
      setMessageType('');
    }
  }, [editingStudent]);

  const resetForm = () => {
    setFormData({
      name: '',
      studentId: '',
      class: 'CSE',
      sportsInvolvement: 'None',
      rank: ''
    });
    setPhoto(null);
    setPhotoPreview(null);
    setMessage('');
    setMessageType('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessageType('error');
        setMessage('Photo size must be less than 5MB');
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name || !formData.studentId || !formData.rank) {
      setMessageType('error');
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('studentId', formData.studentId);
      submitData.append('class', formData.class);
      submitData.append('sportsInvolvement', formData.sportsInvolvement);
      submitData.append('rank', formData.rank);

      if (photo) {
        submitData.append('photo', photo);
      }

      const url = editingStudent ? `/api/students/${editingStudent._id}` : '/api/students';
      const method = editingStudent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData
      });
      const data = await response.json();

      if (data.success) {
        setMessageType('success');
        setMessage(data.message || (editingStudent ? 'Student updated successfully' : 'Student added successfully'));
        resetForm();
        if (onCancelEdit) onCancelEdit();
        if (onStudentAdded) {
          onStudentAdded();
        }
      } else {
        setMessageType('error');
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      {message && (
        <div className={`form-message form-message-${messageType}`}>
          {message}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Student Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Student ID *</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            placeholder="e.g., STU001"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="class">Class *</label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            required
          >
            <option value="CSE">Computer Science Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
            <option value="EEE">Electrical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rank">Rank *</label>
          <input
            type="number"
            id="rank"
            name="rank"
            placeholder="1-100"
            min="1"
            max="100"
            value={formData.rank}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sportsInvolvement">Sports Involvement</label>
          <select
            id="sportsInvolvement"
            name="sportsInvolvement"
            value={formData.sportsInvolvement}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Tennis">Tennis</option>
            <option value="Badminton">Badminton</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo Upload</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <p className="file-info">Max size: 5MB | Formats: JPG, PNG, GIF</p>
        </div>
      </div>

      {photoPreview && (
        <div className="photo-preview">
          <p>Photo Preview:</p>
          <img src={photoPreview} alt="Preview" />
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? editingStudent
              ? 'Updating…'
              : 'Adding…'
            : editingStudent
            ? 'Update Student'
            : 'Add Student'}
        </button>
        {editingStudent && (
          <button
            type="button"
            className="submit-btn"
            style={{ backgroundColor: '#6c757d' }}
            onClick={() => {
              if (onCancelEdit) onCancelEdit();
              resetForm();
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
