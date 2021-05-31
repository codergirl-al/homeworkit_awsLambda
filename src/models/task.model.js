const mongoose = require("mongoose");

const TaskModel = new mongoose.Schema(
  {
    students: [
      {
        type: String,
        required: true,
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resources: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskModel);

module.exports = Task;
