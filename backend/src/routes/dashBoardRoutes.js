import express from "express";
import dashboardController from "../controller/dashBoardConrtoller.js";
const app = express();

const dashboardRoutes = app.get("/dashBoard", dashboardController);

export default dashboardRoutes;