import bcrypt from "bcryptjs"
import User from "../models/User.js"
import JWT from "jsonwebtoken"
//import { generateToken } from "../utils/generateToken.js";
export const signupController=  async(req, res, next)=>{
   try{
        const {name, password, email}= req.body;
         //console.log("Here is the data at the backend: ",name , " ", password , "", email);
        if(!name || !password || !email){
            return res.status(400).json({message: "all fields are required"});
        }
          //console.log("debug: singup  if(!name || !password || !email)(all fields are required): ");
        //database requires an object to describe the query so we instead user.findOne(email)-> user.findOne({email})
        const isExistingUser = await User.findOne({email});
        console.log("isExisting output is : ", isExistingUser);
        if(isExistingUser){
          return res.status(400).json(
                                      {message: "Email already exist: Not registered"}
                                     )
        }
         //  console.log("debug: signupPage passes isExistingUser passed(email already exist): ");
        const salt = await bcrypt.genSalt(10);
        const  passwordHash = await bcrypt.hash(password, salt); 
        const newUser =await User.create({
          name,
          email,
          passwordHash

        });  
        // console.log("debug: singup passwordHash passed: ");
         //  token: generateToken(user._id),
         //console.log("from signup to backend data save succesfully@backend: ", newUser)
        return res.status(201).json(
                       { 
                         message: "You register/signup succefully! ", 
                         user: { 
                                  id:  newUser._id,
                                  name: newUser.name, 
                                  password: newUser.email
                                }
       
    });
   }catch(error){
     res.status(500).json({message: "internal server error"})
     //next(error)
   }
};