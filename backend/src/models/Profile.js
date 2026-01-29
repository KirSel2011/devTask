import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["developer", "manager", "admin"], default: "developer" },
  joinDate: { type: Date, default: Date.now, immutable: true }, // read-only after creation
  avatar: {type: String},
  bio: { type: String },
  user:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
