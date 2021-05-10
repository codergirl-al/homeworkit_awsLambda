const mongoose = require("mongoose");

const ClassModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    teachers: [
      {
        type: String,
        ref: "Subject",
      },
    ],
    students: [
      {
        type: String,
        ref: "Subject",
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", ClassModel);

module.exports = Class;
