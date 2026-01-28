import Comment from "../models/Comment.js";
import mongoose from "mongoose";
/**
 * CREATE COMMENT
 */
export const postCommentController= async (req, res) => {
  const { content } = req.body;
  const { taskId } = req.params;

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const comment = await Comment.create({
    taskId,
    author: req.user.id,
    content
  });

  res.status(201).json(comment);
};

/**
 * GET ALL COMMENTS FOR A TASK
 */
export const getCommentsByTaskController = async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const comments = await Comment.find({ taskId })
    .populate("author", "name email")
    .sort({ createdAt: 1 });

  res.json(comments);
};

/**
 * UPDATE COMMENT
 */
export const updateCommentController = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Content cannot be empty" });
  }

  const query = {
    _id: commentId,
    ...(req.user.role !== "admin" && { author: req.user.id })
  };

  const comment = await Comment.findOneAndUpdate(
    query,
    { content },
    { new: true }
  );

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found or not authorized"
    });
  }

  res.json(comment);
};

/**
 * DELETE COMMENT
 */
export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params;

  const query = {
    _id: commentId,
    ...(req.user.role !== "admin" && { author: req.user.id })
  };

  const comment = await Comment.findOneAndDelete(query);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found or not authorized"
    });
  }

  res.status(200).json({ message: "Comment deleted successfully" });
};


