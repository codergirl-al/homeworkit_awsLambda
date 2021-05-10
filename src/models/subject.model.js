const mongoose = require("mongoose");

const SubjectModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    students: [
      {
        type: String,
        required: true,
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", SubjectModel);

module.exports = Subject;
