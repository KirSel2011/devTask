
import express from "express";
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import cors from "cors"
import dotenv from "dotenv"
import  connectDB from "./src/config/db.js"
import healthCheckRoute from "./src/routes/healthRoutes.js"
import postLoginRoute from "./src/routes/loginRoutes.js"
import postRegisterRoute from "./src/routes/registerRoutes.js"
import dashBoardRoutes from "./src/routes/dashBoardRoutes.js"
import profileRoutes from "./src/routes/profileRoutes.js";
import userRoute from "./src/routes/usersRoutes.js"
import { getTaskRoute,  postTaskRoute, deleteTaskRoute, putTaskRoute } from "./src/routes/taskRoute.js";
import User from "./src/models/User.js"


dotenv.config()  // Load environment variables from .env
/**
 * Express server setup
 * - Applies middleware (CORS, JSON parsing)
 * - Defines routes (e.g., healthCheck)
 * - Starts server AFTER database connection is established
 * 
 */
const app = express();
//console.log("What is the port: ", process.env.JWT_SECRET )
const PORT = 3000;
 export const SECRETJWT =process.env.JWT_SECRET;
 
//middleware
app.use(bodyParser.urlencoded({extended: false})); //pars url-encoded bodies
//without app.use(express.json())... req.body is always {} and
// findByIdAndUpdate updates nothing
app.use(express.json());    // parse Json bodies
app.use(cors())             // Enable Cross-Origin requests
/* app.use(authTokenController) */
const jwtMiddleware= (req, res, next)=>{
    const headerToken = req.headers['authorization'];
    const token =headerToken && headerToken.split(" ")[1];
    console.log("incoming from frontend Token in backend jwtMiddleware: ", token)
    //(!token) can be undefined, null, empty string
    if(!token){
        res.status(401).json({message:"No token is provided"});  //token is not found
        return;
    }else{
            jwt.verify(token, SECRETJWT, (error, user)=>{
                if(error){
                    res.status(403).json({message: "Token does not mutch"});  //token does not match
                    return;
                } 
                req.user= user;   //attach decoded payload to req object
                console.log("jwtMiddleware (req.user= user)extracted user of database using Token backend: ", req.user)
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ID@@@@@@@@@@@@@@@@@@: ", req.user.id)
                req.token= token;  //attach string token to req object
                console.log("What is generated token: ")
                next();          //proceed to next middleware
            })
    }
}
//Routes 
app.use(healthCheckRoute);
app.use('/api/auth', postLoginRoute);
app.use('/api/auth', postRegisterRoute);
app.use(userRoute)
app.use(jwtMiddleware, profileRoutes);
app.use('/api', jwtMiddleware, postTaskRoute);
app.use('/api/tasks',jwtMiddleware, getTaskRoute )
app.use('/api/tasks/update', jwtMiddleware, putTaskRoute);
app.use('/api/tasks/delete',jwtMiddleware, deleteTaskRoute);
app.use( jwtMiddleware, dashBoardRoutes );

//connect to database and start server
async function startServer(){
    try{
        await connectDB();   //ensures dabase connected first   
        app.listen(PORT, ()=>{
            console.log(`The server is listening port ${PORT}  `)
        })
    }catch(error){
            console.log("The server is not running: ")
    }
}
startServer();
