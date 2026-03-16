# 5. FRONTEND DEVELOPMENT (React)

## Frontend Setup Instructions

### Step 1: Create React App

```bash
# Create a new React app
npx create-react-app frontend

# Navigate to frontend folder
cd frontend

# Install additional dependencies
npm install axios
```

### Step 2: Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── StudentForm.js
│   │   ├── StudentForm.css
│   │   ├── StudentList.js
│   │   └── StudentList.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── .gitignore
├── package.json
└── README.md
```

### Step 3: Install Dependencies

```bash
npm install
```

---

## Required Packages

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.2.0 | JavaScript library for UI |
| **react-dom** | ^18.2.0 | React rendering for web browsers |
| **axios** | ^1.3.4 | HTTP client for API calls |
| **react-scripts** | 5.0.1 | Build scripts for React app |

### Installation

```bash
npm install axios react react-dom
```

---

## Frontend Architecture

### App.js - Main Component

**Purpose**: 
- Main orchestrator component
- Manages student data state
- Handles API calls to fetch students
- Passes data to child components

**Key Features**:
```javascript
// Fetch students from backend
const fetchStudents = async () => {
  const response = await fetch('/api/students');
  const data = await response.json();
  setStudents(data.data);
};

// Load students on component mount
useEffect(() => {
  fetchStudents();
}, []);
```

---

### StudentForm Component

**Purpose**: Allow users to add new students

**Features**:
- Input fields: Name, Student ID, Class, Rank
- Dropdown: Sports Involvement
- File input: Photo upload
- Form validation
- Error/success messages
- Photo preview before upload

**Form Data Handling**:
```javascript
const handleSubmit = async (e) => {
  const submitData = new FormData();
  submitData.append('name', formData.name);
  submitData.append('studentId', formData.studentId);
  submitData.append('class', formData.class);
  submitData.append('sportsInvolvement', formData.sportsInvolvement);
  submitData.append('rank', formData.rank);
  
  if (photo) {
    submitData.append('photo', photo);
  }

  const response = await fetch('/api/students', {
    method: 'POST',
    body: submitData
  });
};
```

---

### StudentList Component

**Purpose**: Display all students in a card-based layout

**Features**:
- Card layout with student photo
- Display student information
- Rank badge (color-coded)
- Expandable details
- Delete button
- Responsive design

**Card Display**:
```javascript
{students.map(student => (
  <div key={student._id} className="student-card">
    {/* Photo */}
    <img src={student.photo} alt={student.name} />
    
    {/* Rank Badge */}
    <div className="rank-badge">Rank: {student.rank}</div>
    
    {/* Details */}
    <h3>{student.name}</h3>
    <p>ID: {student.studentId}</p>
    <p>Class: {student.class}</p>
    
    {/* Delete Button */}
    <button onClick={() => handleDelete(student._id)}>Delete</button>
  </div>
))}
```

---

## Complete Frontend Code

### App.js
```javascript
// [Full code provided - see App.js in project]
```

**Key Functions**:
- `fetchStudents()` - Fetches all students from API
- `useEffect()` - Loads students on component mount
- Renders StudentForm and StudentList components

---

### StudentForm.js
```javascript
// [Full code provided - see StudentForm.js in project]
```

**Key Functions**:
- `handleInputChange()` - Updates form state on input
- `handlePhotoChange()` - Handles image selection with preview
- `handleSubmit()` - Submits form data with FormData API

**File Upload Logic**:
```javascript
// Create FormData for file upload
const submitData = new FormData();
submitData.append('name', formData.name);
submitData.append('photo', photo); // File object

// Send to backend
fetch('/api/students', {
  method: 'POST',
  body: submitData  // Note: No Content-Type header needed
});
```

---

### StudentList.js
```javascript
// [Full code provided - see StudentList.js in project]
```

**Key Functions**:
- `handleDelete()` - Deletes a student record
- `toggleExpand()` - Shows/hides additional details
- `getRankColor()` - Assigns color to rank badge (Gold, Silver, Bronze)

---

## Component Props and State

### App.js State
```javascript
const [students, setStudents] = useState([]);  // Array of student objects
const [loading, setLoading] = useState(false); // Loading state
const [error, setError] = useState('');        // Error messages
```

### StudentForm.js State
```javascript
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
```

### StudentList.js Props
```javascript
<StudentList 
  students={[...]}           // Array of student objects
  onStudentDeleted={function} // Callback to refresh list
/>
```

---

## Form Validation

```javascript
// Required fields check
if (!formData.name || !formData.studentId || !formData.rank) {
  setError('Please fill in all required fields');
  return;
}

// File size validation (5MB max)
if (file.size > 5 * 1024 * 1024) {
  setError('Photo size must be less than 5MB');
  return;
}

// File type validation
const allowedTypes = /jpeg|jpg|png|gif/;
if (!allowedTypes.test(file.type)) {
  setError('Only image files allowed');
  return;
}
```

---

## API Communication with Axios

**Note**: We use `fetch()` API instead of Axios for simplicity, but Axios works similarly:

```javascript
// Using Axios (Alternative)
import axios from 'axios';

// GET all students
axios.get('/api/students').then(res => setStudents(res.data.data));

// POST new student
axios.post('/api/students', formData); // FormData for files

// DELETE student
axios.delete(`/api/students/${id}`);
```

---

## Styling

### Global Styles (index.css)
- Base styling
- Color scheme: Purple gradient background
- Font family: Segoe UI, Roboto
- Smooth animations

### Component Styles
- **App.css** - Main layout, header, footer
- **StudentForm.css** - Form styling, inputs, buttons
- **StudentList.css** - Card layout, grid, hover effects

### Responsive Design

```css
/* Desktop: 2-3 cards per row */
.cards-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Tablet: Single column */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Image Display

```javascript
<img 
  src={`http://localhost:5000${student.photo}`}
  alt={student.name}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/200?text=No+Photo';
  }}
/>
```

**Key Points**:
- Full URL: `http://localhost:5000` + `/uploads/filename`
- Error handling: Shows placeholder if image not found
- Served from static `uploads/` folder on backend

---

## Component Data Flow

```
┌─────────────────┐
│    App.js       │
│   (Parent)      │
└────────┬────────┘
         │
    ┌────┴────────────────────┐
    │                         │
┌───▼──────────────┐  ┌──────▼──────────┐
│  StudentForm     │  │  StudentList    │
│   (Add data)     │  │  (Display data) │
│   (Upload file)  │  │  (Delete data)  │
└────────┬─────────┘  └────────┬────────┘
         │                     │
         └──────────┬──────────┘
                    │
              ┌─────▼──────┐
              │ Backend API│
              │ (Express)  │
              │ :5000      │
              └─────┬──────┘
                    │
            ┌───────▼────────┐
            │  MongoDB       │
            │  (Data Store)  │
            └────────────────┘
```

---
