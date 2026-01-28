/**
 * routerCheck - Health check route
 * 
 * Purpose: Provides a simple endpoint to verify that the backend server
 * is up and responding. Useful for monitoring, load balancers, and testing.
 * 
 * GET /api/healthCheck -> Returns JSON { status: 'Ok', message: 'DevTask API is running!' }
 */


const healthCheckup= (req, res, next)=>{
    res.status(200).json({
        status: 'Ok',
        message: "DevTask Api is running! ",
        
    }) 
};
export default healthCheckup;