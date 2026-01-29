
import express from "express";
const app = express();
import { getTasks, postTasks,updateTasks, deleteTasks } from "../controller/taskController.js";

export const getTaskRoute= app.get('', getTasks)
export const postTaskRoute= app.post('', postTasks)
export const deleteTaskRoute=app.delete('/:id', deleteTasks)
export const putTaskRoute = app.put('/:id', updateTasks)

