const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  studentId: { type: String, required: true },
  course: { type: String, enum: ["BGIS1", "BGIS2","BGIS3", "BGIS4"], required: true },
});

const Students = mongoose.model("Student", StudentSchema);

module.exports = Students;
