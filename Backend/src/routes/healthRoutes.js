
/**
 * routerCheck - Health check route
 * 
 * Purpose: Provides a simple endpoint to verify that the backend server
 * is up and responding. Useful for monitoring, load balancers, and testing.
 * 
 * GET /api/healthCheck -> Returns JSON { status: 'Ok', message: 'DevTask API is running!' }
 */
 import express from "express";
const router = express.Router();

const routerCheck= router.get('/api/healthCheck', (req, res, next)=>{
    res.status(200).json({
        status: 'Ok',
        message: "DevTask Api is running! ",
        
    }) 
})

export default routerCheck;

