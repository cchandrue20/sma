# 1. PROJECT OVERVIEW

## What the System Does

The Student Management System is a web-based application built using the **MERN stack** that allows universities to:

- **Add new students** with their basic information
- **Upload student photos** for identification
- **Store student records** in MongoDB database
- **Display all students** in an organized, card-based interface
- **Delete student records** when needed
- **Manage student data** including: Name, Student ID, Class, Sports Involvement, and Academic Rank

This is a college practical project suitable for learning full-stack web development.

---

## System Architecture (MERN Stack)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  React Components:                                           │   │
│  │  • App.js (Main component)                                   │   │
│  │  • StudentForm.js (Input form)                               │   │
│  │  • StudentList.js (Display students)                         │   │
│  │                                                              │   │
│  │  Libraries: Axios (HTTP requests)                            │   │
│  │            React Hooks (State management)                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              ↓ Axios                                 │
│                          HTTP/REST API                              │
│                              ↓                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js + Express)                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Express Server (server.js):                                 │   │
│  │  • API Routes (GET, POST, DELETE)                            │   │
│  │  • CORS Middleware                                           │   │
│  │  • File Upload Handling (Multer)                             │   │
│  │                                                              │   │
│  │  Models:                                                     │   │
│  │  • Student.js (Mongoose Schema)                              │   │
│  │                                                              │   │
│  │  Routes:                                                     │   │
│  │  • studentRoutes.js (CRUD operations)                        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              ↓                                       │
│                       Mongoose ODM                                   │
│                              ↓                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Database: student_management                                │   │
│  │  Collection: students                                        │   │
│  │                                                              │   │
│  │  Document Structure:                                         │   │
│  │  {                                                           │   │
│  │    _id: ObjectId,                                            │   │
│  │    name: String,                                             │   │
│  │    studentId: String,                                        │   │
│  │    photo: String (file path),                                │   │
│  │    class: String,                                            │   │
│  │    sportsInvolvement: String,                                │   │
│  │    rank: Number,                                             │   │
│  │    createdAt: Date,                                          │   │
│  │    updatedAt: Date                                           │   │
│  │  }                                                           │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Frontend** → User fills form and clicks "Add Student"
2. **React** → Collects form data with image file
3. **Axios** → Sends POST request to backend API
4. **Express** → Receives request, validates data
5. **Multer** → Processes image upload
6. **Mongoose** → Saves data to MongoDB
7. **Response** → Backend sends success/error response
8. **Frontend** → Updates UI with new data

---

