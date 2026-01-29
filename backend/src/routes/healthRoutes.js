

 import express from "express";
const router = express.Router();
import healthCheckup from "../controller/healthController.js"
//healthcheck route (used to check if the server is running)
const healthCheckRoute = router.get('/api/healthCheck', healthCheckup)

export default healthCheckRoute;