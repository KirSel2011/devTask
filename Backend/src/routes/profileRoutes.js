import express from "express";
import {getUserProfile, postUserProfile, updateProfile, deleteProfile} from "../controller/profileController.js";
const app = express();
export const getUserProfileRoute= app.get('', getUserProfile);
export const postUserProfileRoute= app.post("", postUserProfile)
export const updateProfileRoute= app.put("/:id", updateProfile)
export const deleteProfileRoute= app.delete("/:id", deleteProfile)

