
import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import  connectDB from "./src/config/db.js"
import healthCheckRoute from "./src/routes/healthRoutes.js"

dotenv.config()  // Load environment variables from .env
/**
 * Express server setup
 * - Applies middleware (CORS, JSON parsing)
 * - Defines routes (e.g., healthCheck)
 * - Starts server AFTER database connection is established
 */
const app = express();
console.log("What is the port: ", process.env.PORT )
const PORT = 3000;

//middleware
app.use(bodyParser.urlencoded({extended: false})); //pars url-encoded bodies
app.use(express.json());    // parse Json bodies
app.use(cors())             // Enable Cross-Origin requests

//healthcheck route (used to check if the server is running)
app.get('/api/healthCheck', healthCheckRoute);

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
