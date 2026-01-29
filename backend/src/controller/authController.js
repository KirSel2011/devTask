import bcrypt from "bcryptjs"
import bcrypt from "bcryptjs"
export const loginController = (req, res, next)=>{
    const {email, password}= req.body.user;

    try{
        console.log("Login backend userdata: ",{email, password});
        if(!password || !email){
            res.status(400).json({message: "all input field are required"})
        }
         res.status(201).json({message:"succefully data recieved will validate", user:{ email, password} 
    })
    }catch(error){
        res.status(500).json({message: "Error message: data not recieved"});
    }
   
};

export const signupController=  async(req, res, next)=>{
   try{
        const {name, password, email}= req.body;
        
        if(!name || !password || !email){
            return res.status(400).json({message: "all fields are required"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt); 
        const user ={
          name,
          email,
          password: hashPassword

        };       
         console.log("What is the new password ******",  hashPassword);
        console.log("Sign up data: ", {name, password, email}); 
        console.log("New user data: ", user);
        res.status(201).json({ message: "user signed succefully", user: { name, password, email}
    })
   }catch(error){
     //res.status(500).json({message: "internal server error"})
     next(error)
   }
};
