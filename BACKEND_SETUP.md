# 3. BACKEND DEVELOPMENT (Node.js + Express)

## Backend Setup Instructions

### Step 1: Initialize Backend Project

```bash
# Navigate to backend folder
cd backend

# Initialize npm project
npm init -y

# Install dependencies
npm install express mongoose cors multer dotenv
npm install --save-dev nodemon
```

### Step 2: Project Structure
The backend folder should have:
```
backend/
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── uploads/
├── .env
├── server.js
└── package.json
```

---

## Module Installation Guide

### Required Modules

| Module | Version | Purpose |
|--------|---------|---------|
| **express** | ^4.18.2 | Web framework for creating REST API |
| **mongoose** | ^7.0.0 | MongoDB Object Data Modeling (ODM) |
| **cors** | ^2.8.5 | Cross-Origin Resource Sharing middleware |
| **multer** | ^1.4.5 | Middleware for handling file uploads |
| **dotenv** | ^16.0.3 | Load environment variables from .env file |
| **nodemon** | ^2.0.20 (dev) | Auto-restart server during development |

### Installation Commands

```bash
# Frontend dependencies
npm install express mongoose cors multer dotenv

# Development dependencies
npm install --save-dev nodemon
```

---

## Module Purposes

### Express
- **Purpose**: Creates the REST API server
- **Usage**: Handles HTTP requests, routes, middleware
- **Example**:
  ```javascript
  const express = require('express');
  const app = express();
  app.get('/api/students', (req, res) => {
    res.json({ message: 'Get all students' });
  });
  ```

### Mongoose
- **Purpose**: Connects to MongoDB and defines data schemas
- **Usage**: Define student schema, perform database operations
- **Example**:
  ```javascript
  const studentSchema = new mongoose.Schema({
    name: String,
    studentId: String
  });
  ```

### CORS
- **Purpose**: Enables communication between frontend (React) and backend (Express)
- **Usage**: Allows requests from different origins
- **Example**:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

### Multer
- **Purpose**: Handles file/image uploads
- **Usage**: Save student photos to server
- **Example**:
  ```javascript
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  ```

### Nodemon
- **Purpose**: Auto-restarts server when files change
- **Usage**: For development convenience
- **Example**: `npm run dev` runs server with nodemon

### DotENV
- **Purpose**: Loads environment variables from .env file
- **Usage**: Store sensitive data like MongoDB URI
- **Example**:
  ```javascript
  require('dotenv').config();
  const uri = process.env.MONGO_URI;
  ```

---

## Complete Backend Code

### 1. server.js
Located at: `backend/server.js`

```javascript
// [Full code provided - see server.js in the project]
```

**Key Features**:
- Initializes Express app
- Connects to MongoDB using Mongoose
- Sets up CORS middleware
- Configures static file serving for uploads
- Defines API routes
- Includes error handling middleware

---

### 2. Student Schema (Mongoose Model)
Located at: `backend/models/Student.js`

```javascript
// [Full code provided - see Student.js in the project]
```

**Schema Fields**:
- `name` - String, required, min 2 characters
- `studentId` - String, required, unique
- `photo` - String (file path), optional
- `class` - String, required, enum (CSE, IT, ECE, ME, CE, EEE)
- `sportsInvolvement` - String, optional, default 'None'
- `rank` - Number, required, 1-100
- `createdAt` - Auto timestamp
- `updatedAt` - Auto timestamp

---

### 3. Student Routes (API Endpoints)
Located at: `backend/routes/studentRoutes.js`

```javascript
// [Full code provided - see studentRoutes.js in the project]
```

**API Endpoints**:

#### GET All Students
```
GET /api/students
Response: { success: true, count: 5, data: [...] }
```

#### GET Single Student
```
GET /api/students/:id
Response: { success: true, data: {...} }
```

#### POST - Add New Student
```
POST /api/students
Headers: Content-Type: multipart/form-data
Body: {
  name: "John Doe",
  studentId: "STU001",
  class: "CSE",
  sportsInvolvement: "Cricket",
  rank: 15,
  photo: (file)
}
Response: { success: true, message: "Student added", data: {...} }
```

#### PUT - Update Student
```
PUT /api/students/:id
Headers: Content-Type: multipart/form-data
Body: {
  name: "Jane Doe",
  class: "IT",
  rank: 8,
  photo: (file - optional)
}
Response: { success: true, message: "Student updated", data: {...} }
```

#### DELETE - Delete Student
```
DELETE /api/students/:id
Response: { success: true, message: "Student deleted", data: {...} }
```

---

## Multer Configuration for Image Upload

```javascript
// Configure storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
```

**Features**:
- Saves images to `uploads/` folder
- Creates unique filenames (prevents overwriting)
- Accepts only image formats (JPEG, JPG, PNG, GIF)
- Maximum file size: 5MB
- Provides error handling for invalid files

---

## Database Connection

```javascript
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_management';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✓ Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });
```

**Environment Setup** (`.env` file):
```
MONGO_URI=mongodb://localhost:27017/student_management
PORT=5000
NODE_ENV=development
```

---
