# 6. RUNNING THE APPLICATION

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** installed (v14 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **MongoDB** installed and running locally
   - Check: `mongod --version`
   - Start MongoDB service before running backend

3. **Git** (optional, for version control)

---

## Step 1: Install MongoDB (Windows)

### Option A: Using MongoDB Community Server

1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Select "Install MongoDB as a Service"
4. MongoDB starts automatically
5. Verify connection:
   ```bash
   mongosh
   > show databases
   ```

### Option B: Using MongoDB Atlas (Cloud Database)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
   ```

---

## Step 2: Start Backend Server

### Terminal 1: Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Output should show:
# ✓ Connected to MongoDB successfully
# 🚀 Server is running on http://localhost:5000
# 📊 API Base URL: http://localhost:5000/api
```

**Troubleshooting**:
- Port 5000 in use? Change in `.env`: `PORT=5001`
- MongoDB not running? Start MongoDB service
- Modules not found? Run `npm install` again

---

## Step 3: Start Frontend Server

### Terminal 2: Frontend

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start

# Browser opens automatically at: http://localhost:3000
```

**Troubleshooting**:
- Port 3000 in use? React asks to use different port
- Dependencies error? Run `npm install` again
- CORS errors? Backend may not be running

---

## Step 4: Test the Application

### Open Browser

Navigate to: **http://localhost:3000**

### Test Features

1. **Add Student**
   - Fill in form: Name, Student ID, Class, Rank
   - Optional: Select Sports, Upload Photo
   - Click "Add Student"
   - Check success message

2. **View Students**
   - Students appear as cards
   - Shows: Name, ID, Class, Sports, Photo, Rank
   - Cards are clickable to expand

3. **Delete Student**
   - Click "Delete" button on student card
   - Confirm deletion
   - Student disappears from list

4. **Check Backend**
   - Terminal shows API requests
   - Browse: http://localhost:5000/api/students (shows JSON)

---

## Expected Output

### Terminal 1 (Backend)

```
✓ Connected to MongoDB successfully
🚀 Server is running on http://localhost:5000
📊 API Base URL: http://localhost:5000/api

POST /api/students 200 12.345ms
GET /api/students 200 5.123ms
DELETE /api/students/64a2f5c8d3f2e9c1a0b1c2d3 200 8.456ms
```

### Terminal 2 (Frontend)

```
Compiled successfully!
You can now view student-management-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://xxx.xxx.x.xx:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Browser Display

**Homepage**:
- Header: "📚 Student Management System"
- Form: Fields for adding students
- Cards: Display of existing students
- Responsive design adapts to screen size

---

## Folder Structure After Setup

```
sms/
├── backend/
│   ├── node_modules/        # ← Created after npm install
│   ├── uploads/             # ← Student photos stored here
│   │   ├── 1647432000000-photo.jpg
│   │   ├── 1647432120000-photo.jpg
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json    # ← Created after npm install
│
└── frontend/
    ├── node_modules/        # ← Created after npm install
    ├── public/
    ├── src/
    ├── package.json
    └── package-lock.json    # ← Created after npm install
```

---

## Running the Full Application (One Command)

### Option 1: Using Concurrently (Recommended)

```bash
# In project root (sms folder), install concurrently
npm install -g concurrently

# Create a root package.json:
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}

# Run both servers
npm run dev
```

### Option 2: Use Two Terminal Tabs

**Tab 1**: `cd backend && npm run dev`
**Tab 2**: `cd frontend && npm start`

---

## API Testing (Using Postman or Browser)

### 1. GET All Students

```
URL: http://localhost:5000/api/students
Method: GET
Response:
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a2f5c8d3f2e9c1a0b1c2d3",
      "name": "Rajesh Kumar",
      "studentId": "STU001",
      "class": "CSE",
      "rank": 5,
      "photo": "/uploads/1647432000000-photo.jpg"
    }
  ]
}
```

### 2. POST Add Student

```
URL: http://localhost:5000/api/students
Method: POST
Content-Type: multipart/form-data
Body:
  name: John Doe
  studentId: STU001
  class: CSE
  rank: 15
  photo: (file)
Response:
{
  "success": true,
  "message": "Student added successfully",
  "data": { ... }
}
```

### 3. DELETE Student

```
URL: http://localhost:5000/api/students/64a2f5c8d3f2e9c1a0b1c2d3
Method: DELETE
Response:
{
  "success": true,
  "message": "Student deleted successfully",
  "data": { ... }
}
```

---

## Production Build

### Build Frontend for Production

```bash
cd frontend
npm run build

# Creates optimized build in frontend/build/ folder
# Size: ~150KB (gzipped)
```

### Deploy Backend

```bash
# Install production process manager
npm install -g pm2

# Start backend with PM2
pm2 start server.js --name "student-api"

# View logs
pm2 logs student-api
```

---

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` or check Atlas connection |
| CORS error | Backend running? Check `corsAllowed: ['http://localhost:3000']` |
| Port already in use | Change port in `.env` or kill process: `lsof -i :5000` |
| "Cannot find module" | Run `npm install` in both folders |
| Photo not displaying | Check `uploads/` folder exists and has images |
| Form not submitting | Check browser console for errors (F12) |
| API calls failing | Verify backend is running and proxy setting in frontend |

---
