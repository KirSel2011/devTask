// connect to database

/**
 * connectDB - Establishes a connection to MongoDB using Mongoose.
 *
 * This function:
 *  1. Reads the MongoDB URI from environment variables (process.env.DB_URI).
 *  2. Attempts to connect to the database asynchronously.
 *  3. Logs a success message if the connection is established.
 *  4. Logs an error and terminates the process if the connection fails.
 *
 * Usage:
 *   import connectDB from './config/db.js';
 *   await connectDB();
 */
import mongoose from "mongoose"; 
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Mongodb connect succefully")
    }catch(error){
        console.error("Mongodb fail to connect", error.message);
        process.exit();
    }
}
export default connectDB;