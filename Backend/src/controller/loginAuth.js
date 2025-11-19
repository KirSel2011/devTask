import bcrypt from "bcryptjs"
 import User from "../models/User.js"
const loginController = async(req, res, next)=>{
    const {email, password}= req.body;
   console.log("login Password: ", password, "    :email  ", email);
    try{
        console.log("Login backend userdata: ",{email, password});
        if(!password || !email){
            return res.status(400).json({message: "all input field are required"})
        }
        // to verify if the password exist in the user database
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credential: password does not exist"})
        }
        //compare the password with hash password
        const isMatch = await bcrypt.compare(password, user.passwordHash )
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credential: password does not macth"});
        }
        //password match and user authenticate
         res.status(201).json({message:"You login succesful.!", user:{name: user.name,  email: user.email} })
    }catch(error){
        res.status(500).json({message: "Error message:server error"});
    }
   
};

export default loginController;