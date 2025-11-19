import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
     title: {type: String,  required: true},
     status: {type: String, required: true, enum: ["todo", "progress", "completed"], defautl: "todo"},
     assignedTO:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
     createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps:true}
)

export default taskSchema.model("Task", taskSchema)