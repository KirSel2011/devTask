import express from "express";
import {
  createTaskValidator,
  taskIdParamValidator,
} from "../validators/taskValidators.js";
import validateRequest from "../middlewareValidator/validateRequest.js";
import {
  postTasks,
  getTasks,
} from "../src/controller/taskController.js";

const router = express.Router();

router.post(
  "/",
  createTaskValidator,
  validateRequest,
  postTasks
);

router.get(
  "/:id",
  taskIdParamValidator,
  validateRequest,
  getTasks
);

export default router;
