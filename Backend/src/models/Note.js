import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task"},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: {type: String}
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
