
import { response } from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js"
import mongoose from "mongoose";


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // string from JWT

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find profile by user ID
    let userProfile = await Profile.findOne({ user: userId });

    // Sometimes Mongoose auto-casting fails; explicit conversion
    if (!userProfile) {
      const objectUserId = new mongoose.Types.ObjectId(userId);
      userProfile = await Profile.findOne({ user: objectUserId });
    }

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Build response
    const profile = {
      id: userProfile._id.toString(),
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      joinDate: userProfile.joinDate,
      role: userProfile.role || "unassigned role",
      avatar: userProfile.avatar,
      bio: userProfile.bio,
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const postUserProfile= async(req, res, next)=>{
    try{
        const profile = req.body;
        
    console.log("DEBUG req.user:", req.user);   
        console.log("DEBUG req.body:", req.body);  
        const userId = req.user.id; 
        console.log("DEBUG userId:", userId);     
    const isExistingProfile =await Profile.findOne({user:userId});
    //console.log("98374573957397593759739 existingProfile 9999999999999:", isExistingProfile)
    if(isExistingProfile){
        res.status(400).json({message: "Profile already existed!"});
        return;
    }
    const firstInitial = profile.firstName?.[0].toUpperCase() || ""
    const lastInitial = profile.lastName?.[0].toUpperCase() ||   ""
    const userAvatar = firstInitial + lastInitial;
    console.log("-----------------------------------------------------------------------------------------")
    console.log("Firstname: ", profile.firstName);
    console.log("lastName: ", profile.lastName);
        console.log("Role: ", profile.role)
    const userProfile ={
        user: userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.role,
        bio: profile.bio || "has not added yet",
        avatar: userAvatar
    }

   const saveProfile= await Profile.create(userProfile)
   console.log("ProfileForm data in backend created and saved in database",saveProfile)

   res.status(200).json({

    message: "Profile created succesfuly",
    saveProfile: saveProfile
   }
    
   );
    }catch(error){
         res.status(500).json({message: "Server error"})
    }
}; 

export const updateProfile = async (req, res, next)=>{
    console.log("------->Update body: ", req.body);
       console.log("-------->Update body:(req.user.id) ", req.user.id);
    console.log("---------------->update profile with id:( req.params.id) ", req.params.id);
    try{
        const updateProfile =await Profile.findByIdAndUpdate(req.params.id, {$set: req.body},
        {new: true, runValidators:true}
    );
    if(!updateProfile){
        res.status(404).json({message: "profile is not found"})
    }
    res.json(updateProfile)
    res.status(200).json({
        updateProfile: "update profile"
    })}catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}
export const deleteProfile = async (req, res, next)=>{
    try{
        const {id}= req.params;
        console.log("DeleteProfile id task output of extracted const {id}= req.params: ", id)
        console.log("------------------------req.params.id==================: ", req.params.id)
    const deleteProfile =await Profile.findByIdAndDelete(req.params.id);
 
    console.log("In Delete profile controller req.param.id to be deleted : ", req.params.id)
    console.log("In Delete profile Controller deleted task: ", deleteProfile)
    if(!deleteProfile){
        res.status(404).json({message: "profile is not found"})
    };
    res.status(200).json({message: "Delete profile succeffuly"})
}catch(error){
    console.log(error);
    res.status(500).json({message: "Server error"})
}
}