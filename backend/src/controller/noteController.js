
import Note from "../models/Note.js";
export const getNotesByTaskController = async (req, res) => {
  const notes = await Note.find({
    taskId: req.params.taskId, //taskId comes from url when a user clicks getNote
    owner: req.user.id   // 🔐 SECURITY RULE when a user login and access user id
  });

  res.json(notes);
};

export const postCreateNotesController = async (req, res) => {
  const note = await Note.create({
    taskId: req.params.taskId,
    owner: req.user.id,
    content: req.body.content
  });

  res.status(201).json(note);
};
export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id }, // 🔐
    { content: req.body.content },
    { new: true }
  );

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};
export const deleteNote = async (req, res) => {
    console.log("In Backend in deleteNote noteController req.params.noteId: ", req.params.noteId);
        console.log("In Backend in deleteNote noteController req.user.id: ", req.user.id);
  const deleteNote = await Note.findOneAndDelete({
    _id: req.params.noteId,
    owner: req.user.id   
  });
  if (!deleteNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(204).send({message: "Note succesfully deleted"});
};
