# 2. PROJECT FOLDER STRUCTURE

```
sms/
│
├── backend/
│   ├── models/
│   │   └── Student.js              # Mongoose schema for student
│   │
│   ├── routes/
│   │   └── studentRoutes.js         # API endpoints (GET, POST, DELETE)
│   │
│   ├── uploads/                     # Directory for uploaded images
│   │   └── (empty initially)
│   │
│   ├── .env                         # Environment variables
│   ├── server.js                    # Main Express server file
│   ├── package.json                 # Dependencies and scripts
│   └── .gitignore                   # Git ignore file
│
│
├── frontend/
│   ├── public/
│   │   ├── index.html               # Main HTML file
│   │   └── favicon.ico              # App icon
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js       # Form to add students
│   │   │   ├── StudentForm.css      # Form styles
│   │   │   ├── StudentList.js       # Display students as cards
│   │   │   └── StudentList.css      # List styles
│   │   │
│   │   ├── App.js                   # Main React component
│   │   ├── App.css                  # App styles
│   │   ├── index.js                 # React entry point
│   │   ├── index.css                # Global styles
│   │   └── .gitignore               # Git ignore file
│   │
│   ├── package.json                 # Dependencies and scripts
│   └── .gitignore
│
│
└── README.md                        # Project documentation
```

## Folder Descriptions

### Backend Folder

- **`models/`** - Contains Mongoose schemas defining database structure
- **`routes/`** - Contains API route controllers for CRUD operations
- **`uploads/`** - Stores uploaded student photos
- **`server.js`** - Main Express server file that initializes the app
- **`package.json`** - Lists all backend dependencies
- **`.env`** - Environment variables (MongoDB URI, Port)

### Frontend Folder

- **`public/`** - Static HTML and assets
- **`src/`** - All React components and styling
- **`components/`** - Reusable React components (Form, List)
- **`App.js`** - Main React component that orchestrates the app
- **`index.js`** - React application entry point

---
