import express from 'express'
import {  suggestTaskController} from '../controller/suggestTaskController.js'
const app = express()
export const postSuggestTask= app.post("/sugget-task",  suggestTaskController);