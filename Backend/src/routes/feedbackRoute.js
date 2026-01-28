import express from "express";
import { addFeedbackController } from "../controller/feedbackController.js";
const app = express()

export const addFeedbackRoute =app.post("/:id/feedback", addFeedbackController)
