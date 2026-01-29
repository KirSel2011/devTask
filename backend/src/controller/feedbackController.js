import Task from "../models/Task.js";
export const addFeedbackController = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.feedback = {
    rating: req.body.rating,
    message: req.body.message,
    givenBy: req.user.id,
    givenAt: new Date()
  };
  await task.save();
  res.json(task);
};
