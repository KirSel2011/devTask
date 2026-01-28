import { Schema } from "mongoose"
import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema({
    feedback: {
        rating: { type: Number, min: 1, max: 5 },
        message: {type: String},
        givenBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        givenAt: {type: Date}
}
})
export default Schema.model("Feedback", feedbackSchema)
