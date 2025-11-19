import express from "express";
const router = express.Router();
import loginController from "../controller/loginAuth.js"
const postLoginRoute= router.post("/api/auth/login",loginController)

export default postLoginRoute;