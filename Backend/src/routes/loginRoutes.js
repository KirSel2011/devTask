import express from "express";
const router = express.Router();

const postLoginRoute= router.post("/login",(req, res, next)=>{
    res.status(200).json({
        userName: "My name",
        password: "myPasse"
    })
})

export default postLoginRoute;