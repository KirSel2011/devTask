import Users from "../models/User.js"

const getAllUsersController =async (req, res, next)=>{
  try{
       const users =await Users.find({}, 'name email');
       console.log("What are the list of users in Database: ", users);
     if(users.length === 0){
        return res.status(404).json({message: "users not found"});
     }
     res.json(users)
  }catch(error){
    res.status(500).json({message: "Internal server error"});
  }
}
export default getAllUsersController;