import express from "express";
import profileControlller from "../controller/profileController.js";
const app = express();
const profileRoutes= app.get("/profile", profileControlller);

export default profileRoutes;