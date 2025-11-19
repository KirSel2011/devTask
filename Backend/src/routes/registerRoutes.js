import express from "express";
const router = express.Router();
import {signupController} from "../controller/signupAuth.js"
//post route with endpoit api/auth/signup
const postRegisterRoute= router.post("/api/auth/signup", signupController)

export default postRegisterRoute