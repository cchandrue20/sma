# 7. MODULES USED - COMPLETE REFERENCE TABLE

## All Modules and Their Purposes

### Backend Modules

| Module | Type | Version | Purpose | Usage Example | Installation |
|--------|------|---------|---------|----------------|--------------|
| **express** | Framework | ^4.18.2 | Web server and API routing | `const app = express(); app.get('/api/students', callback)` | `npm install express` |
| **mongoose** | ODM | ^7.0.0 | MongoDB object modeling and connection | `const schema = new mongoose.Schema({...})` | `npm install mongoose` |
| **cors** | Middleware | ^2.8.5 | Enable cross-origin requests (Frontend ↔ Backend) | `app.use(cors())` | `npm install cors` |
| **multer** | Middleware | ^1.4.5 | Handle file/image uploads from forms | `const upload = multer({...}); app.post('/', upload.single('photo'))` | `npm install multer` |
| **dotenv** | Configuration | ^16.0.3 | Load environment variables from .env file | `require('dotenv').config(); const uri = process.env.MONGO_URI` | `npm install dotenv` |
| **nodemon** | Dev Tool | ^2.0.20 | Auto-restart server on file changes | `npm run dev` (runs server with nodemon) | `npm install --save-dev nodemon` |

---

## Module Details

### 1. EXPRESS

**What it does**: Acts as the web framework for creating REST API

**Key Features**:
- Route handling (GET, POST, PUT, DELETE)
- Middleware support
- Error handling
- Static file serving

**Usage**:
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/students', (req, res) => {
  res.json({ message: 'Get all students' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

---

### 2. MONGOOSE

**What it does**: Connect to MongoDB and define data schemas

**Key Features**:
- Schema validation
- Data modeling
- Query building
- Relationships management

**Usage**:
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_management');

// Define schema
const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  rank: Number
});

// Create model
const Student = mongoose.model('Student', studentSchema);

// CRUD operations
const student = await Student.findById(id);
```

---

### 3. CORS (Cross-Origin Resource Sharing)

**What it does**: Allows requests from different origins (ports/domains)

**Why needed**: Frontend (port 3000) needs to call Backend API (port 5000)

**Usage**:
```javascript
const cors = require('cors');

app.use(cors()); // Allow all origins

// Or specific origins
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Without CORS**: Browser throws error:
```
Access to XMLHttpRequest has been blocked by CORS policy
```

---

### 4. MULTER

**What it does**: Handle file uploads (images, documents, etc.)

**Key Features**:
- Save files to server
- File filtering
- File size limits
- Unique filename generation

**Usage**:
```javascript
const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create upload middleware
const upload = multer({ storage: storage });

// Use in route
app.post('/api/students', upload.single('photo'), (req, res) => {
  const photoPath = req.file.path;
  // Save to database
});
```

---

### 5. DOTENV

**What it does**: Load environment variables from .env file

**Why needed**: Store sensitive data outside code (MongoDB URI, API keys, ports)

**Usage**:
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_management';

app.listen(PORT);
```

**.env file**:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_management
NODE_ENV=development
```

**Benefits**:
- Keep secrets out of git
- Different configs per environment (dev, prod)
- Easy to update without restarting

---

### 6. NODEMON

**What it does**: Auto-restart Node server when files change

**Why needed**: Development convenience - no manual restart needed

**Usage**:
```bash
# Install
npm install --save-dev nodemon

# Run
npm run dev  # Uses nodemon
# vs
npm start    # Uses node (no auto-restart)
```

**Package.json**:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Frontend Modules

| Module | Type | Version | Purpose | Installation |
|--------|------|---------|---------|--------------|
| **react** | Library | ^18.2.0 | JavaScript library for UI components | Included in create-react-app |
| **react-dom** | Library | ^18.2.0 | Renders React to browser | Included in create-react-app |
| **axios** | HTTP Client | ^1.3.4 | Make API calls to backend | `npm install axios` |
| **react-scripts** | Build Tool | 5.0.1 | Build and dev server | Included in create-react-app |

---

### 7. REACT

**What it does**: JavaScript library for building user interfaces with components

**Key Concepts**:
- Components (reusable UI pieces)
- JSX (HTML-like syntax in JavaScript)
- Hooks (State, Effects)
- Virtual DOM (efficient updates)

**Usage**:
```javascript
import React, { useState } from 'react';

function StudentForm() {
  const [name, setName] = useState('');

  return (
    <form>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student name"
      />
    </form>
  );
}
```

---

### 8. AXIOS (Alternative to Fetch)

**What it does**: Make HTTP requests to backend API

**Features**:
- Simpler syntax than Fetch
- Automatic JSON conversion
- Request/Response interceptors
- Timeout support

**Usage**:
```javascript
import axios from 'axios';

// GET request
axios.get('/api/students')
  .then(res => console.log(res.data))
  .catch(err => console.log(err));

// POST request
axios.post('/api/students', {
  name: 'John',
  studentId: 'STU001'
})
  .then(res => console.log('Added!'))
  .catch(err => console.log(err));

// With file upload
const formData = new FormData();
formData.append('name', 'John');
formData.append('photo', file);

axios.post('/api/students', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**vs Fetch API** (used in our project):
```javascript
// Fetch (no axios needed)
fetch('/api/students')
  .then(res => res.json())
  .then(data => console.log(data));

// POST with Fetch
fetch('/api/students', {
  method: 'POST',
  body: formData  // Automatically sets Content-Type for FormData
});
```

---

## Dependency Graph

```
┌──────────────────────────────────┐
│   Backend (server.js)            │
├──────────────────────────────────┤
│                                  │
│  ┌─ express ────────────────┐    │
│  │  ├─ cors                 │    │
│  │  ├─ multer (uploads)     │    │
│  │  └─ routes               │    │
│  └──────────────────────────┘    │
│           ↓                       │
│  ┌─ mongoose ───────────────┐    │
│  │  ├─ Student schema       │    │
│  │  └─ MongoDB connection   │    │
│  └──────────────────────────┘    │
│           ↓                       │
│  ┌─ dotenv ──────────────────┐   │
│  │  └─ Load .env variables   │   │
│  └────────────────────────────┘   │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   Frontend (React App)           │
├──────────────────────────────────┤
│                                  │
│  ┌─ react ──────────────────┐    │
│  │  ├─ App.js               │    │
│  │  ├─ StudentForm.js       │    │
│  │  └─ StudentList.js       │    │
│  └──────────────────────────┘    │
│           ↓                       │
│  ┌─ axios/fetch ────────────┐    │
│  │  └─ API calls to backend │    │
│  └──────────────────────────┘    │
│           ↓                       │
│     Backend API (5000)            │
└──────────────────────────────────┘
```

---

## Module Installation Summary

### Backend Installation
```bash
cd backend
npm init -y
npm install express mongoose cors multer dotenv
npm install --save-dev nodemon
```

### Frontend Installation
```bash
# Option 1: Create new React app
npx create-react-app frontend

# Option 2: Setup in existing folder
npm install react react-dom react-scripts
npm install axios
```

---

## Version Management

### Check Installed Versions
```bash
npm list
# Shows all installed packages and versions
```

### Update Packages
```bash
npm update  # Updates to latest minor version
npm outdated  # Shows outdated packages
```

### Specific Versions
```bash
npm install express@4.18.2  # Install specific version
npm install express@latest  # Install latest version
npm install express@^4.18   # Install compatible versions
```

---
