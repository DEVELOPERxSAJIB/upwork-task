const mongoose = require("mongoose");

// Todo Schema
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model.Todo || mongoose.model("Todo", todoSchema);
