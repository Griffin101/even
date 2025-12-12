// ===============================================
// PRACTICAL 4 – CRUD + ARRAY OPERATIONS (MongoDB)
// ===============================================

// Switch to database (creates if not exists)
use mydb;

// -----------------------------------------------
// CREATE COLLECTION
// -----------------------------------------------
db.createCollection("students");

// -----------------------------------------------
// INSERT DOCUMENTS (Create Operation)
// -----------------------------------------------

// Insert student 1 with embedded documents
db.students.insertOne({
  regNo: "3014",
  name: "VR",
  course: { courseName: "MCA", duration: "3 years" },
  address: { city: "Bangalore", state: "KA", country: "India" }
});

// Insert student 2
db.students.insertOne({
  regNo: "3015",
  name: "Anita",
  age: 22,
  course: "MSc.AI",
  marks: 85
});

// Insert student 3
db.students.insertOne({
  regNo: "3016",
  name: "Rahul",
  age: 23,
  course: "BSc.IT",
  marks: 90
});

// -----------------------------------------------
// READ OPERATIONS (Find)
// -----------------------------------------------

// Find all documents in students
db.students.find();

// Find one document by condition
db.students.find({ regNo: "3014" });

// Projection: show only name and course fields
db.students.find({}, { name: 1, course: 1 });

// -----------------------------------------------
// UPDATE OPERATIONS
// -----------------------------------------------

// Update name for regNo=3014 using $set
db.students.updateOne(
  { regNo: "3014" },
  { $set: { name: "Vighnesh R" } }
);

// Increment marks for a student
db.students.updateOne(
  { regNo: "3015" },
  { $inc: { marks: 5 } }
);

// Update nested embedded field (address.city)
db.students.updateOne(
  { regNo: "3014" },
  { $set: { "address.city": "Mangalore" } }
);

// -----------------------------------------------
// DELETE OPERATIONS
// -----------------------------------------------

// Delete one document
db.students.deleteOne({ regNo: "3015" });

// Delete many where age < 22
db.students.deleteMany({ age: { $lt: 22 } });

// -----------------------------------------------
// ARRAY OPERATIONS (posts collection)
// -----------------------------------------------

// Create posts collection
db.createCollection("posts");

// Insert one post with empty comments array
db.posts.insertOne({
  title: "MongoDB Arrays",
  user: "VR",
  tags: ["mongodb", "nosql"],
  comments: []
});

// Push comment into array
db.posts.updateOne(
  { title: "MongoDB Arrays" },
  { $push: { comments: { user: "Jayesh", text: "Nice article", likes: 0 } } }
);

// Update specific comment using positional operator $
db.posts.updateOne(
  { "comments.user": "Jayesh" },
  { $set: { "comments.$.text": "Updated comment" } }
);

// Remove (pull) a comment
db.posts.updateOne(
  { title: "MongoDB Arrays" },
  { $pull: { comments: { user: "Jayesh" } } }
);

// Add new field to all array elements
db.posts.updateOne(
  { title: "MongoDB Arrays" },
  { $set: { "comments.$[].approved": true } }
);

// END PRACTICAL 4
// ===============================================
// PRACTICAL 5 – Count, Sort, Limit, Skip, Aggregate
// ===============================================

// Switch to database
// use mydb; 

// Create collection
db.createCollection("marks");

// -----------------------------------------------
// INSERT DATA
// -----------------------------------------------

db.marks.insertMany([
  { name: "VR", age: 22, marks: 85, course: "MSc.AI" },
  { name: "Aditya", age: 23, marks: 90, course: "MSc.IT" },
  { name: "Anurag", age: 21, marks: 95, course: "MSc.CS" },
  { name: "Anita", age: 22, marks: 80, course: "MSc.AI" }
]);

// -----------------------------------------------
// COUNT DOCUMENTS
// -----------------------------------------------

// Count all documents
db.marks.countDocuments();

// Count students scoring >= 85
db.marks.countDocuments({ marks: { $gte: 85 } });

// -----------------------------------------------
// SORTING
// -----------------------------------------------

// Sort marks in descending order
db.marks.find().sort({ marks: -1 });

// Sort by course ASC, then marks DESC
db.marks.find().sort({ course: 1, marks: -1 });

// -----------------------------------------------
// LIMIT
// -----------------------------------------------

// Get top 2 scorers
db.marks.find().sort({ marks: -1 }).limit(2);

// -----------------------------------------------
// SKIP
// -----------------------------------------------

// Skip 1 record, show next 2
db.marks.find().sort({ marks: -1 }).skip(1).limit(2);

// -----------------------------------------------
// AGGREGATIONS
// -----------------------------------------------

// Average marks grouped by course
db.marks.aggregate([
  {
    $group: {
      _id: "$course",
      avgMarks: { $avg: "$marks" },
      count: { $sum: 1 }
    }
]);

// Maximum marks per course
db.marks.aggregate([
  { $group: { _id: "$course", maxMarks: { $max: "$marks" } } }
]);

// Average marks sorted descending
db.marks.aggregate([
  { $group: { _id: "$course", avgMarks: { $avg: "$marks" } } },
  { $sort: { avgMarks: -1 } }
]);

// END PRACTICAL 5
