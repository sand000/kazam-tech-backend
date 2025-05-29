const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
});
const TaskModel = mongoose.model("assignment_sandhya", taskSchema);
module.exports = TaskModel;

