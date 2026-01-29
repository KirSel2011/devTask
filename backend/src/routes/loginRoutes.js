import express from "express";
const router = express.Router();
import loginController from "../controller/loginAuth.js"
const postLoginRoute= router.post("/login", loginController)

export default postLoginRoute;