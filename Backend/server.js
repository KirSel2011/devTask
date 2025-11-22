
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
console.log("What is the port: ", process.env.JWT_SECRET )
const PORT = 3000;
 export const SECRETJWT =process.env.JWT_SECRET;
 
//middleware
app.use(bodyParser.urlencoded({extended: false})); //pars url-encoded bodies
app.use(express.json());    // parse Json bodies
app.use(cors())             // Enable Cross-Origin requests
/* app.use(authTokenController) */
const jwtMiddleware= (req, res, next)=>{
    const headerToken = req.headers['authorization'];
    console.log("jwtMiddleware HeaderToken in Serverjs: ", headerToken);
     const token =headerToken && headerToken.split(" ")[1];
    console.log("What is the jwtMiddleware Token: ", token);
    if(token === null){
        res.status(401).json({message:"Invalid token"});  //token is not found
        return;
    }else{
            jwt.verify(token, SECRETJWT, (error, user)=>{
                if(error){
                    res.status(403).json({message: "Token does not mutch"});  //token does not match
                    return;
                }
                req.user= user;   //attach decoded payload to req object
                req.token= token;  //attach string token to req object
                next();          //proceed to next middleware
            })
    }
}
//Routes 
app.use(healthCheckRoute);
app.use(postLoginRoute);
app.use(postRegisterRoute);
app.use(dashBoardRoutes, jwtMiddleware);
app.use(profileRoutes,jwtMiddleware);


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
