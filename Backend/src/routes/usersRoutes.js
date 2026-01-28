import  getAllUsersController from "../controller/usersController.js"
import express from "express"
const app = express()
const userRoute = app.get('/api/users', getAllUsersController)
export default userRoute;
