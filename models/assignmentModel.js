const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    required: true,
  },
});

const assignmentModel = mongoose.model("assignments", assignmentSchema);

module.exports = assignmentModel;
