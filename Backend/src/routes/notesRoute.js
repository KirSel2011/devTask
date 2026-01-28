import express from "express";
import { getNotesByTaskController, postCreateNotesController, deleteNote, updateNote } from "../controller/noteController.js";
const app = express();
export const postNoteRoute =app.post("", postCreateNotesController); 
export const getNoteRoute = app.get("", getNotesByTaskController);
export const deleteNoteRoute = app.delete("/:taskId/notes/:noteId",deleteNote);
export const updateNoteRoute = app.put("/:noteId", updateNote);