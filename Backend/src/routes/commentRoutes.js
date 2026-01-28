import {postCommentController, getCommentsByTaskController, updateCommentController, deleteCommentController } from "../controller/commentController.js"
import express from "express"
/* const app = express();
export const postCommentRoute = app.post("/:taskId/comments", postCommentController)
export const getCommentRoute = app.get("/:taskId/comments", getCommentsByTaskController)
export const deleteCommentRoute= app.delete("/:commentId", deleteCommentController)
export const updateCommentRoute= app.put("/:commentId", updateCommentController) */



const router = express.Router();

router.post("/:taskId/comments", postCommentController);
router.get("/:taskId/comments", getCommentsByTaskController);
router.put("/:commentId", updateCommentController);
router.delete("/:commentId", deleteCommentController);

export default router;
