const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaffSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  //section: { type: String, required: true },
  section: { type: String, enum: ["SVY", "GIS","PROP", "IT"], required: true },
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;