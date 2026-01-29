import { body, param } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title must be under 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["open", "in-progress", "completed"])
    .withMessage("Invalid status value"),

  body("assignedTo")
    .optional()
    .isString().withMessage("AssignedTo must be a string"),
];

export const taskIdParamValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
];
