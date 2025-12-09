import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
     title: {type: String,  required: true},
     description: {type: String},
     status: {type: String, required: true, enum: ["todo", "inprogress", "complete", 'pending'], default: "todo"},
     assignedTo:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
     createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
     dueDate: {type: Date}
}, {timestamps:true}
)

export default mongoose.model("Task", taskSchema)