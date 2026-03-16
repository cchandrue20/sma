# 4. DATABASE DESIGN (MongoDB)

## MongoDB Database Structure

### Database Name
```
student_management
```

### Collection Name
```
students
```

---

## Complete Schema Structure

```javascript
{
  _id: ObjectId,                    // Unique identifier (auto-generated)
  name: String,                      // Student full name (required)
  studentId: String,                 // Unique student ID (required, unique)
  photo: String,                     // Photo file path (optional)
  class: String,                     // Class/Branch (required)
  sportsInvolvement: String,         // Sports participation (optional)
  rank: Number,                      // Academic rank 1-100 (required)
  createdAt: Date,                   // Created timestamp (auto)
  updatedAt: Date                    // Updated timestamp (auto)
}
```

---

## Field Specifications

| Field | Type | Required | Unique | Validation | Example |
|-------|------|----------|--------|-----------|---------|
| `_id` | ObjectId | Yes | Yes | Auto-generated | 64a2f5c8d3f2e9c1a0b1c2d3 |
| `name` | String | Yes | No | Min 2 chars | "Rajesh Kumar" |
| `studentId` | String | Yes | Yes | Must be unique | "STU001" |
| `photo` | String | No | No | File path | "/uploads/1234567-photo.jpg" |
| `class` | String | Yes | No | Enum | "CSE", "IT", "ECE", "ME" |
| `sportsInvolvement` | String | No | No | Enum | "Cricket", "None" |
| `rank` | Number | Yes | No | 1-100 | 15, 42, 99 |
| `createdAt` | Date | Auto | No | Auto timestamp | 2024-03-16T10:30:00.000Z |
| `updatedAt` | Date | Auto | No | Auto timestamp | 2024-03-16T10:30:00.000Z |

---

## Class/Branch Options (Enum)

```
- CSE      (Computer Science Engineering)
- IT       (Information Technology)
- ECE      (Electronics & Communication Engineering)
- ME       (Mechanical Engineering)
- CE       (Civil Engineering)
- EEE      (Electrical Engineering)
```

---

## Sports Options (Enum)

```
- None
- Cricket
- Football
- Basketball
- Volleyball
- Tennis
- Badminton
```

---

## Example Documents

### Example 1: Complete Student Record

```json
{
  "_id": ObjectId("64a2f5c8d3f2e9c1a0b1c2d3"),
  "name": "Rajesh Kumar",
  "studentId": "STU001",
  "photo": "/uploads/1647432000000-photo.jpg",
  "class": "CSE",
  "sportsInvolvement": "Cricket",
  "rank": 5,
  "createdAt": ISODate("2024-03-16T10:30:00.000Z"),
  "updatedAt": ISODate("2024-03-16T10:30:00.000Z")
}
```

### Example 2: Student Without Photo

```json
{
  "_id": ObjectId("64a2f5c8d3f2e9c1a0b1c2d4"),
  "name": "Priya Singh",
  "studentId": "STU002",
  "photo": null,
  "class": "IT",
  "sportsInvolvement": "Volleyball",
  "rank": 12,
  "createdAt": ISODate("2024-03-16T11:15:00.000Z"),
  "updatedAt": ISODate("2024-03-16T11:15:00.000Z")
}
```

### Example 3: Student With No Sports

```json
{
  "_id": ObjectId("64a2f5c8d3f2e9c1a0b1c2d5"),
  "name": "Amit Patel",
  "studentId": "STU003",
  "photo": "/uploads/1647432120000-photo.jpg",
  "class": "ECE",
  "sportsInvolvement": "None",
  "rank": 25,
  "createdAt": ISODate("2024-03-16T12:00:00.000Z"),
  "updatedAt": ISODate("2024-03-16T12:00:00.000Z")
}
```

---

## MongoDB Queries

### Create Connection String

```
mongodb://localhost:27017/student_management
```

### Insert a Student

```javascript
db.students.insertOne({
  "name": "John Doe",
  "studentId": "STU001",
  "photo": "/uploads/photo.jpg",
  "class": "CSE",
  "sportsInvolvement": "Cricket",
  "rank": 10
})
```

### Find All Students

```javascript
db.students.find({})
```

### Find by Class

```javascript
db.students.find({ "class": "CSE" })
```

### Find by Rank Range

```javascript
db.students.find({ "rank": { $gte: 1, $lte: 10 } })
```

### Update Student

```javascript
db.students.updateOne(
  { "_id": ObjectId("...") },
  { $set: { "rank": 8, "sportsInvolvement": "Football" } }
)
```

### Delete Student

```javascript
db.students.deleteOne({ "_id": ObjectId("...") })
```

---

## Indexes for Performance

### Recommended Indexes

```javascript
// Create index on studentId for faster lookups
db.students.createIndex({ "studentId": 1 }, { unique: true })

// Create index on class for filtering
db.students.createIndex({ "class": 1 })

// Create index on rank for sorting
db.students.createIndex({ "rank": 1 })
```

---

## Data Relationships

```
┌─────────────────────────┐
│   students Collection   │
├─────────────────────────┤
│ _id                     │ (Primary Key)
│ name                    │
│ studentId (unique)      │ (Unique Key)
│ photo                   │
│ class                   │
│ sportsInvolvement       │
│ rank                    │
│ createdAt               │
│ updatedAt               │
└─────────────────────────┘
```

MongoDB is **NoSQL**, so there are **no foreign keys or joins**.
Each document is **self-contained** with all necessary information.

---
