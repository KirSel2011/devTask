import express from "express";
const router = express.Router();


const postRegisterRoute=router.post("/register", (req, res, next)=>{

    res.status(200).json({
        registers: "Yes it is register"
    })
})

export default postRegisterRoute