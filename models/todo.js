const mongoose = require("mongoose");
const todoListSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("TodoList", todoListSchema);
