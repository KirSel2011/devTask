import bcrypt from "bcryptjs"
 import User from "../models/User.js"
 import jwtUtility from "../utility/jwt.util.js"
const loginController = async(req, res, next)=>{
    const {email, password}= req.body;
   console.log("login Password: ", password, "    :email  ", email);
    try{
        //console.log("Login backend userdata: ",{email, password});
        if(!password || !email){
            return res.status(400).json({message: "all input field are required"})
        }
        //console.log("Login Debug:if(!password || !email) This passes the password and email exist!");
        // to verify if the password exist in the user database
        const user = await User.findOne({email});
        console.log("Login Backend user data extracted from database: ", user);
        if(!user){
            return res.status(400).json({message:"Invalid Credential: password does not exist"})
        }
         const retToken = jwtUtility(user);
        
         console.log(" Debug: Token created backend @loginController using current user & send Frontend: ", retToken);
        //compare the password with hash password
        const isMatch = await bcrypt.compare(password, user.passwordHash )
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credential: password does not macth"});
                  
        }
         res.status(201).json({message:"You login succesful.!", user:{name: user.name,  email: user.email, id: user._id}, token: retToken})
    }catch(error){
        res.status(500).json({message: "Error message:server error"});
       
    }
   
};

export default loginController;